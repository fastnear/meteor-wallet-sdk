"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectedMeteorWalletAccount = exports.MeteorWallet = void 0;
const near_api_js_1 = require("near-api-js");
const transactions_1 = require("@near-js/transactions");
const types_dappConnect_1 = require("../../meteor-common/src/modules_feature/dapp_connect/types_dappConnect");
const borsh_1 = require("borsh");
const StringUtils_1 = require("../../meteor-common/src/modules_utility/data_type_utils/StringUtils");
const EnvironmentStorageUtils_1 = require("../../meteor-common/src/modules_utility/state_utils/EnvironmentStorageUtils");
const MeteorSdkUtils_1 = require("./utils/MeteorSdkUtils");
const MeteorPostMessenger_1 = require("./postMessage/MeteorPostMessenger");
const TransactionSchemaV2_1 = require("./near-schema/TransactionSchemaV2");
const crypto_1 = require("@near-js/crypto");
const create_action_1 = require("./utils/create-action");
const bn_js_1 = require("bn.js");
const LOGIN_WALLET_URL_SUFFIX = "/login/";
const SIGN_WALLET_URL_SUFFIX = "/sign/";
const MULTISIG_HAS_METHOD = "add_request_and_confirm";
const LOCAL_STORAGE_KEY_SUFFIX = "_meteor_wallet_auth_key";
const PENDING_ACCESS_KEY_PREFIX = "pending_key"; // browser storage key for a pending access key (i.e. key has been generated but we are not sure it was added yet)
const localStorageAdapter = new EnvironmentStorageUtils_1.EnvironmentStateAdapter_Sync({
    getString: (key) => window.localStorage.getItem(key),
    setString: (key, value) => window.localStorage.setItem(key, value),
    clear: (key) => window.localStorage.removeItem(key),
});
const sessionAdapter = new EnvironmentStorageUtils_1.EnvironmentStateAdapter_Sync({
    getString: (key) => window.sessionStorage.getItem(key),
    setString: (key, value) => window.sessionStorage.setItem(key, value),
    clear: (key) => window.sessionStorage.removeItem(key),
});
/**
 * This class is used in conjunction with `near-api-js` and `BrowserLocalStorageKeyStore`.
 * It directs users to the Meteor Extension or (if not available) a popup of the Meteor Wallet website for key management.
 *
 * @example
 * ```js
 * import { MeteorWallet } from "@meteorwallet/sdk";
 *
 * // create new MeteorWallet instance (passing in your initialized Near connection)
 * const meteorWallet = new MeteorWallet({ near: connectedNear, appKeyPrefix: 'my-app' });
 *
 * // -- or -- (for a quick and default Near connection config)
 * const meteorWallet = MeteorWallet.init({ networkId: "testnet" });
 *
 * // If not signed in, start the sign-in flow with Meteor Wallet.
 * // Keys will be stored in the BrowserLocalStorageKeyStore
 * if(!meteorWallet.isSignedIn()) {
 *   const { accountId } = await meteorWallet.requestSignIn();
 * }
 * ```
 */
class MeteorWallet {
    /**
     * The easiest way to set up the SDK. Returns an instance of MeteorWallet, automatically connected to the Near API.
     *
     * If you need more control over the Near Network configuration- rather use {@link MeteorWallet:constructor}
     *
     * @example
     * ```js
     * const wallet = await MeteorWallet.init({ networkId: "testnet" });
     * ```
     */
    static async init({ walletUrl, ...config }) {
        const keyStore = new near_api_js_1.keyStores.BrowserLocalStorageKeyStore();
        const near = await (0, near_api_js_1.connect)({
            keyStore,
            headers: {},
            walletUrl: (0, MeteorSdkUtils_1.resolveWalletUrl)(config.networkId, walletUrl),
            ...(0, MeteorSdkUtils_1.getNetworkPreset)(config.networkId),
            ...config,
        });
        const wallet = new MeteorWallet({ near, appKeyPrefix: "near_app" });
        // Cleanup up any pending keys (cancelled logins).
        if (!wallet.isSignedIn()) {
            await keyStore.clear();
        }
        return wallet;
    }
    /**
     * Construct MeteorWallet. If you'd a quick and default way, you can also use {@link MeteorWallet.init}
     *
     * @example
     * ```js
     * // create new MeteorWallet instance (passing in your initialized Near connection)
     * const meteorWallet = new MeteorWallet({ near: connectedNear, appKeyPrefix: 'my-app' });
     *
     * if(!meteorWallet.isSignedIn()) {
     *   const { accountId } = await meteorWallet.requestSignIn();
     * }
     * ```
     */
    constructor({ near, appKeyPrefix = near.config.contractName ?? "default", }) {
        /** @hidden */
        this._initializationPromises = [];
        this._near = near;
        const authDataKey = appKeyPrefix + LOCAL_STORAGE_KEY_SUFFIX;
        this._authDataKey = authDataKey;
        this._authData = localStorageAdapter.getJson(authDataKey) ?? { allKeys: [] };
        this._networkId = near.config.networkId;
        this._walletBaseUrl = near.config.walletUrl;
        this._keyStore = near.connection.signer.keyStore;
        /*
        console.log("Initialized wallet- checking if signed in");
    
        if (!this.isSignedIn()) {
          console.log("Completing sign-in process, if its available");
          this._initializationPromises.push(this._completeSignInWithAccessKey());
        }*/
    }
    /* async initialize() {
       await Promise.all(this._initializationPromises);
     }*/
    isExtensionInstalled() {
        return window.meteorWallet != null;
    }
    /**
     * Returns true, if this app is authorized with an account in the wallet.
     * @example
     * ```js
     * const wallet = new MeteorWallet({ near: connectedNear, appKeyPrefix: 'my-app' });
     * wallet.isSignedIn();
     * ```
     */
    isSignedIn() {
        return !!this._authData.accountId;
    }
    /**
     * Returns authorized Account ID.
     * @example
     * ```js
     * const wallet = new MeteorWallet(near, 'my-app');
     * const accountId = wallet.getAccountId();
     * ```
     */
    getAccountId() {
        return this._authData.accountId;
    }
    /**
     * Verifies that the user is the owner of a specific Near account, available in the wallet.
     * Removes the need to do blockchain operations for simple Dapp actions.
     * Signs a payload with the wallet's private key. Will return a promise with a payload like so:
     *
     * ```ts
     * interface VerifiedOwner {
     *   accountId: string;
     *   message: string;                 // The same passed message, unencrypted
     *   blockId: string;
     *   publicKey: string;               // The public key which should be verified as belonging to this account
     *   signature: string;               // The signed payload (this exact same object JSON stringified, excluding this "signature" property)
     *   keyType: utils.key_pair.KeyType; // Type from inside the near-api-js package
     * }
     * ```
     *
     * or throw a {@link MeteorActionError} error if the verification failed for whatever reason.
     * */
    async verifyOwner(options) {
        const accountId = options.accountId ?? this.getAccountId();
        const response = await (0, MeteorPostMessenger_1.getMeteorPostMessenger)().connectAndWaitForResponse({
            actionType: types_dappConnect_1.EExternalActionType.verify_owner,
            inputs: {
                accountId,
                message: options.message,
            },
            network: this._networkId,
        });
        if (response.success) {
            return response;
        }
        else {
            throw new types_dappConnect_1.MeteorActionError({
                endTags: response.endTags,
                message: response.message,
            });
        }
    }
    /**
     * Requests a sign-in using Meteor Wallet. Will return a promise with the `accountId` of the
     * signed-in account, or throw a {@link MeteorActionError} error if the sign-in failed for whatever reason.
     * */
    async requestSignIn(options) {
        const { keyPair, ...restOptions } = options;
        const accessKey = keyPair ?? near_api_js_1.KeyPair.fromRandom("ed25519");
        let usingPublicKey = accessKey.getPublicKey().toString();
        const response = await (0, MeteorPostMessenger_1.getMeteorPostMessenger)().connectAndWaitForResponse({
            actionType: types_dappConnect_1.EExternalActionType.login,
            inputs: { public_key: usingPublicKey, ...restOptions },
            network: this._networkId,
        });
        if (response.success) {
            const { allKeys, accountId } = response.payload;
            this._authData = {
                accountId,
                allKeys,
                signedInContract: {
                    contract_id: restOptions.contract_id,
                    public_key: usingPublicKey,
                },
            };
            localStorageAdapter.setJson(this._authDataKey, this._authData);
            await this._keyStore.setKey(this._networkId, accountId, accessKey);
            return {
                success: true,
                endTags: [],
                payload: {
                    accessKey,
                    accountId,
                },
            };
        }
        else {
            throw new types_dappConnect_1.MeteorActionError({
                endTags: response.endTags,
                message: response.message,
            });
        }
    }
    /**
     * Sign out from the current account
     */
    async signOut() {
        const accountId = this.getAccountId();
        if (this._authData.signedInContract != null && accountId != null) {
            const inputs = {
                accountId,
                contractInfo: this._authData.signedInContract,
            };
            const response = await (0, MeteorPostMessenger_1.getMeteorPostMessenger)().connectAndWaitForResponse({
                actionType: types_dappConnect_1.EExternalActionType.logout,
                inputs,
                network: this._networkId,
            });
        }
        this._authData = { allKeys: [] };
        localStorageAdapter.clear(this._authDataKey);
    }
    /**
     * Allows users to sign a message for a specific recipient using their NEAR account, based on the [NEP413](https://github.com/near/NEPs/pull/413).
     *
     * Will return a promise with a payload like so:
     *
     * ```ts
     * interface signMessage {
     *   accountId: string;               // The account name to which the publicKey corresponds as plain text
     *   publicKey: string;               // The public counterpart of the key used to sign
     *   signature: string;               // The base64 representation of the signature
     *   state?: string;                  // The same state passed in.
     * }
     * ```
     *
     * or throw a {@link MeteorActionError} error if the signing failed for whatever reason.
     * */
    async signMessage({ message, nonce, recipient, callbackUrl, state, accountId, }) {
        const response = await (0, MeteorPostMessenger_1.getMeteorPostMessenger)().connectAndWaitForResponse({
            actionType: types_dappConnect_1.EExternalActionType.sign_message,
            inputs: {
                message,
                nonce,
                recipient,
                callbackUrl,
                state,
                accountId,
            },
            network: this._networkId,
        });
        if (response.success) {
            response.payload.state = state;
            return response;
        }
        else {
            throw new types_dappConnect_1.MeteorActionError({
                endTags: response.endTags,
                message: response.message,
            });
        }
    }
    /**
     * Sign transactions using Meteor Wallet. Will return a promise with an array of `FinalExecutionOutcome`
     * of the given transactions.
     * */
    async requestSignTransactions(inputs) {
        const { transactions } = inputs;
        const transformedTransactions = await this.transformTransactions(transactions);
        console.log("Transformed transactions", transformedTransactions);
        const response = await (0, MeteorPostMessenger_1.getMeteorPostMessenger)().connectAndWaitForResponse({
            actionType: types_dappConnect_1.EExternalActionType.sign,
            inputs: {
                transactions: transformedTransactions
                    .map((transaction) => (0, borsh_1.serialize)(TransactionSchemaV2_1.SCHEMA_V2, transaction))
                    .map((serialized) => Buffer.from(serialized).toString("base64"))
                    .join(","),
            },
            // inputs: { public_key: usingPublicKey, ...options },
            network: this._networkId,
        });
        // console.log("Finished sign-in request", response);
        if (response.success) {
            return response.payload.executionOutcomes;
        }
        else {
            throw new types_dappConnect_1.MeteorActionError({
                endTags: response.endTags,
                message: response.message,
            });
        }
    }
    /**
     * Returns the current connected wallet account
     */
    account() {
        const currentAccountId = this.getAccountId();
        if ((0, StringUtils_1.notNullEmpty)(currentAccountId) &&
            this._connectedAccount?.accountId !== currentAccountId) {
            this._connectedAccount = new ConnectedMeteorWalletAccount(this, this._near.connection, currentAccountId);
        }
        return this._connectedAccount;
    }
    async transformTransactions(transactions) {
        const account = this.account();
        const { networkId, signer, provider } = account.connection;
        const localKey = await signer.getPublicKey(account.accountId, networkId);
        return Promise.all(transactions.map(async (transaction, index) => {
            const accessKey = await account.accessKeyForTransaction(localKey);
            if (!accessKey) {
                throw new Error(`Failed to find matching key for transaction sent to ${transaction.receiverId}`);
            }
            const transformedActions = transaction.actions.map((action) => (0, create_action_1.createAction)(action));
            const block = await provider.block({ finality: "final" });
            return (0, transactions_1.createTransaction)(account.accountId, crypto_1.PublicKey.from(accessKey.public_key), transaction.receiverId, new bn_js_1.BN(accessKey.access_key.nonce).add(new bn_js_1.BN(index)).add(new bn_js_1.BN(1)), transformedActions, near_api_js_1.utils.serialize.base_decode(block.header.hash));
            /*return {
              receiverId: transaction.receiverId,
              signerId: account.accountId,
              actions: transformedActions,
            };*/
        }));
    }
}
exports.MeteorWallet = MeteorWallet;
/**
 * Near Account implementation which makes use of {@link MeteorWallet} when no local key is available.
 *
 * Generally won't be created directly- can be obtained by using {@link MeteorWallet.account}
 *
 * @example
 * ```js
 * const account = meteorWallet.account();
 *
 * // uses Meteor Wallet to sign the transaction using this account
 * const response = await account.requestSignTransaction({
 *   actions: transactionActions,
 *   receiverId: "my-contract"
 * });
 * ```
 */
class ConnectedMeteorWalletAccount extends near_api_js_1.Account {
    /** @hidden */
    constructor(walletConnection, connection, accountId) {
        super(connection, accountId);
        this.meteorWallet = walletConnection;
    }
    /**
     * Sign a transaction using Meteor Wallet. Overrides the Near Account API method of the same name, makes use of {@link ConnectedMeteorWalletAccount.signAndSendTransaction_direct}
     */
    async signAndSendTransaction(...args) {
        if (typeof args[0] === "string") {
            return this.signAndSendTransaction_direct({
                receiverId: args[0],
                actions: args[1],
            });
        }
        return this.signAndSendTransaction_direct(args[0]);
    }
    /** @hidden */
    async trySendOrCreateTransaction({ receiverId, actions, }) {
        const localKey = await this.connection.signer.getPublicKey(this.accountId, this.connection.networkId);
        let accessKey = await this.accessKeyForTransaction(localKey);
        if (accessKey != null && accessKey.access_key.permission !== "FullAccess") {
            // check that this is a valid access key for the given transaction
            const accessKeyMatchesTransaction = await this.accessKeyMatchesTransaction(accessKey, receiverId, actions);
            if (!accessKeyMatchesTransaction) {
                return {
                    sent: false,
                    transaction: {
                        receiverId,
                        signerId: this.accountId,
                        actions,
                    },
                };
            }
        }
        if (accessKey) {
            if (localKey && localKey.toString() === accessKey.public_key) {
                try {
                    return {
                        executionOutcome: await super.signAndSendTransaction({
                            receiverId,
                            actions: actions.map((action) => (0, create_action_1.createAction)(action)),
                        }),
                        sent: true,
                    };
                }
                catch (e) {
                    if (e.type !== "NotEnoughAllowance") {
                        throw e;
                        // accessKey = await this.accessKeyForTransaction(receiverId, actions);
                    }
                }
            }
        }
        /*const block = await this.connection.provider.block({ finality: "final" });
        const blockHash = baseDecode(block.header.hash);
    
        const publicKey = utils.PublicKey.from(accessKey.public_key);
        // TODO: Cache & listen for nonce updates for given access key
        const nonce = accessKey.access_key.nonce + 1;
        const transaction = transactions.createTransaction(
          this.accountId,
          publicKey,
          receiverId,
          nonce,
          actions,
          blockHash,
        );*/
        return {
            sent: false,
            transaction: {
                receiverId,
                signerId: this.accountId,
                actions,
            },
        };
    }
    /**
     * Sign a transaction using Meteor Wallet
     * @see {@link MeteorWallet.requestSignTransactions}
     */
    async signAndSendTransaction_direct({ receiverId, actions, }) {
        const { transaction, sent, executionOutcome } = await this.trySendOrCreateTransaction({ receiverId, actions });
        if (sent) {
            return executionOutcome;
        }
        return (await this.meteorWallet.requestSignTransactions({
            transactions: [transaction],
        }))[0];
    }
    /** @hidden */
    /*async signAndSendTransaction_redirect({
      receiverId,
      actions,
      walletMeta,
      walletCallbackUrl = window.location.href,
    }: SignAndSendTransactionOptions): Promise<FinalExecutionOutcome> {
      const { transaction, sent, executionOutcome } = await this.trySendOrCreateTransaction({ receiverId, actions });
  
      if (sent) {
        return executionOutcome!;
      }
  
      await this.meteorWallet.requestSignTransactions_redirect({
        transactions: [transaction!],
        meta: walletMeta,
        callback_url: walletCallbackUrl,
      });
  
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error("Failed to redirect to sign transaction"));
        }, 1000);
      });
    }*/
    /**
     * Check if given access key allows the function call or method attempted in transaction
     * @param accessKey Array of {access_key: AccessKey, public_key: PublicKey} items
     * @param receiverId The NEAR account attempting to have access
     * @param actions The action(s) needed to be checked for access
     */
    async accessKeyMatchesTransaction(accessKey, receiverId, actions) {
        const { access_key: { permission }, } = accessKey;
        if (permission === "FullAccess") {
            return true;
        }
        console.log("Comparing access key and actions", {
            accessKey,
            receiverId,
            actions,
        });
        if (permission.FunctionCall) {
            const { receiver_id: allowedReceiverId, method_names: allowedMethods } = permission.FunctionCall;
            /********************************
             Accept multisig access keys and let wallets attempt to signAndSendTransaction
             If an access key has itself as receiverId and method permission add_request_and_confirm, then it is being used in a wallet with multisig contract: https://github.com/near/core-contracts/blob/671c05f09abecabe7a7e58efe942550a35fc3292/multisig/src/lib.rs#L149-L153
             ********************************/
            if (allowedReceiverId === receiverId &&
                allowedMethods.includes(MULTISIG_HAS_METHOD)) {
                return true;
            }
            if (allowedReceiverId === receiverId) {
                if (actions.length !== 1) {
                    return false;
                }
                const firstAction = actions[0];
                console.log(firstAction);
                if (firstAction.type === "FunctionCall") {
                    const functionCallParams = firstAction.params;
                    return ((!functionCallParams.deposit ||
                        functionCallParams.deposit.toString() === "0") && // TODO: Should support charging amount smaller than allowance?
                        (allowedMethods.length === 0 ||
                            allowedMethods.includes(functionCallParams.methodName)));
                }
                // const [{ functionCall }] = actions;
                // return (
                //   functionCall &&
                //   (!functionCall.deposit || functionCall.deposit.toString() === "0") && // TODO: Should support charging amount smaller than allowance?
                //   (allowedMethods.length === 0 ||
                //     allowedMethods.includes(functionCall.methodName))
                // );
                // TODO: Handle cases when allowance doesn't have enough to pay for gas
            }
        }
        // TODO: Support other permissions than FunctionCall
        return false;
    }
    /**
     * Helper function returning the access key (if it exists) to the receiver that grants the designated permission
     * @param localKey A local public key provided to check for access
     * @returns Promise<any>
     */
    async accessKeyForTransaction(localKey) {
        const accessKeys = await this.getAccessKeys();
        console.log("accessKeys", accessKeys);
        if (localKey) {
            const accessKey = accessKeys.find((key) => key.public_key.toString() === localKey.toString());
            if (accessKey) {
                return accessKey;
            }
        }
        const walletKeys = this.meteorWallet._authData.allKeys;
        for (const accessKey of accessKeys) {
            if (walletKeys.indexOf(accessKey.public_key) !== -1) {
                return accessKey;
            }
        }
        for (const accessKey of accessKeys) {
            if (accessKey.access_key.permission === "FullAccess") {
                return accessKey;
            }
        }
        return null;
    }
}
exports.ConnectedMeteorWalletAccount = ConnectedMeteorWalletAccount;
//# sourceMappingURL=MeteorWallet.js.map