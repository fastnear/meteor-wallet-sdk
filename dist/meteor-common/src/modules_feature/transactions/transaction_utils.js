"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transaction_utils = exports.isSingleActionTrx = exports.getTrxType = exports.ETransactionType = void 0;
const borsh_1 = require("borsh");
const near_api_js_1 = require("near-api-js");
const bn_js_1 = __importDefault(require("bn.js"));
const near_constants_1 = require("../../modules_external/near/near_constants");
const near_indexer_transaction_types_1 = require("../../modules_external/near_public_indexer/types/near_indexer_transaction_types");
const fungible_token_standard_types_1 = require("../../modules_external/near/types/standards/fungible_token_standard_types");
const nft_standard_types_1 = require("../../modules_external/near/types/standards/nft_standard_types");
// export type TTransactionType = "receive" | "send" | "self" | "unknown";
var ETransactionType;
(function (ETransactionType) {
    ETransactionType["receive"] = "receive";
    ETransactionType["send"] = "send";
    ETransactionType["self"] = "self";
    ETransactionType["unknown"] = "unknown";
})(ETransactionType = exports.ETransactionType || (exports.ETransactionType = {}));
const getTrxType = (trx, accountId) => {
    // const accountId = AppStore.useState((s) => s.selectedAccountId);
    if (trx.signer_account_id === accountId &&
        trx.signer_account_id === trx.receiver_account_id) {
        return ETransactionType.self;
    }
    if (trx.receiver_account_id === "meteor-points.near") {
        return ETransactionType.receive;
    }
    if (trx.signer_account_id === accountId) {
        return ETransactionType.send;
    }
    if (trx.receiver_account_id === accountId) {
        return ETransactionType.receive;
    }
    if (trx?.actions) {
        for (const action of trx?.actions) {
            if (action.action_kind === near_indexer_transaction_types_1.ENearIndexer_ActionKind.FUNCTION_CALL) {
                if (action?.args?.args_json?.receiver_id === accountId) {
                    // console.log(action?.args?.method_name)
                    // console.log(action?.args?.args_json?.receiver_id)
                    return ETransactionType.receive;
                }
            }
        }
    }
    return ETransactionType.unknown;
};
exports.getTrxType = getTrxType;
const isSingleActionTrx = (trx) => {
    return trx?.actions && trx.actions.length === 1;
};
exports.isSingleActionTrx = isSingleActionTrx;
const deserializeTransactionsFromString = (transactionsString) => transactionsString
    .split(",")
    .map((str) => Buffer.from(str, "base64"))
    .map((buffer) => (0, borsh_1.deserialize)(near_api_js_1.transactions.SCHEMA, near_api_js_1.transactions.Transaction, buffer));
const parseNearApiTrxActionToIndexType = (action) => {
    if (action.functionCall != null) {
        const action_kind = near_indexer_transaction_types_1.ENearIndexer_ActionKind.FUNCTION_CALL;
        const deposit = action.functionCall.deposit.toString(10);
        const gas = action.functionCall.gas.toString(10);
        const method_name = action.functionCall.methodName;
        const args_base64 = Buffer.from(action.functionCall.args).toString("base64");
        let args_json, args_str;
        try {
            args_str = Buffer.from(action.functionCall.args).toString("utf8");
            try {
                args_json = JSON.parse(args_str);
            }
            catch (err) {
                console.debug("arg string cannot parse to json:", args_str);
            }
        }
        catch (err) {
            console.debug("arg string cannot parse by utf_8:", args_str);
        }
        const args = {
            gas,
            method_name,
            deposit,
            args_base64,
            args_json,
            args_str,
        };
        return {
            action_kind,
            args,
        };
    }
    return {};
};
const parseNearApiTrxToIndexType = (trx) => {
    const actions = trx.actions.map(parseNearApiTrxActionToIndexType);
    const receiver_account_id = trx.receiverId;
    const signer_account_id = trx.signerId;
    // trx.blockHash;
    const nonce = trx.nonce;
    const signer_public_key = trx.publicKey;
    return {
        actions,
        signer_public_key,
        signer_account_id,
        receiver_account_id,
        nonce,
    };
};
// 10 yocto NEAR
const NEAR_THRESHOLD = "10";
const calcTotalTokenInTransactions = (trxs) => {
    const ftTokens = {};
    let totalTokens = [];
    if (!trxs || !trxs.length) {
        return { ftTokens, totalTokens };
    }
    const addToFtToken = (tokenName, amount) => {
        if (!ftTokens[tokenName]) {
            ftTokens[tokenName] = new bn_js_1.default(0);
        }
        ftTokens[tokenName] = ftTokens[tokenName].add(new bn_js_1.default(amount));
    };
    const isOverThreshold = (amount) => {
        return amount.cmp(new bn_js_1.default(NEAR_THRESHOLD)) >= 0;
    };
    trxs.forEach((trx) => {
        trx.actions.forEach((action) => {
            try {
                if (action?.transfer?.deposit &&
                    isOverThreshold(action?.transfer?.deposit)) {
                    addToFtToken(near_constants_1.NEAR_SYM, action.transfer.deposit);
                }
                if (action?.functionCall) {
                    if (action?.functionCall?.deposit &&
                        isOverThreshold(action?.functionCall?.deposit)) {
                        addToFtToken(near_constants_1.NEAR_SYM, action.functionCall.deposit);
                    }
                    if (action?.functionCall?.methodName ===
                        fungible_token_standard_types_1.EFunctionCallMethod_FungibleTokenStandard.ft_transfer ||
                        action?.functionCall?.methodName ===
                            fungible_token_standard_types_1.EFunctionCallMethod_FungibleTokenStandard.ft_transfer_call) {
                        const parsed = parseNearApiTrxActionToIndexType(action);
                        addToFtToken(trx.receiverId, parsed.args?.args_json.amount);
                    }
                    if (action?.functionCall?.methodName ===
                        nft_standard_types_1.ENearFunctionCallMethod_NftStandard.nft_transfer ||
                        action?.functionCall?.methodName ===
                            nft_standard_types_1.ENearFunctionCallMethod_NftStandard.nft_transfer) {
                        const parsed = parseNearApiTrxActionToIndexType(action);
                        totalTokens.push({
                            type: "nft",
                            contractName: trx.receiverId,
                            tokenId: parsed.args?.args_json.token_id,
                        });
                    }
                }
            }
            catch (err) {
                console.error(err);
            }
        });
    });
    totalTokens = [
        ...totalTokens,
        ...Object.entries(ftTokens).map(([contractName, amount]) => ({
            type: "ft",
            contractName,
            amount,
        })),
    ];
    return {
        ftTokens,
        totalTokens,
    };
};
function tryParseArgsBase64Json(rawArgBase64) {
    if (!rawArgBase64) {
        return;
    }
    try {
        if (typeof rawArgBase64 !== "string") {
            rawArgBase64 = Buffer.from(rawArgBase64).toString("utf8");
        }
        return JSON.parse(rawArgBase64);
    }
    catch (err) {
        return;
    }
}
function tryAddParseActionArgsJsonForTrx(trxs) {
    if (!trxs) {
        return trxs;
    }
    if (!(trxs instanceof Array)) {
        trxs = [trxs];
    }
    trxs.forEach((trx) => {
        trx?.actions?.forEach?.((action) => {
            if (action.action_kind === near_indexer_transaction_types_1.ENearIndexer_ActionKind.FUNCTION_CALL) {
                if (action.args.args_json !== undefined) {
                    return;
                }
                if (action.args.args_base64) {
                    const args_json = tryParseArgsBase64Json(action.args.args_base64);
                    if (args_json) {
                        action.args.args_json = args_json;
                    }
                }
            }
        });
    });
    return trxs;
}
const getAccessKey = (permission) => {
    if (permission === "FullAccess") {
        return near_api_js_1.transactions.fullAccessKey();
    }
    const { receiverId, methodNames = [] } = permission;
    const allowance = permission.allowance
        ? new bn_js_1.default(permission.allowance)
        : undefined;
    return near_api_js_1.transactions.functionCallAccessKey(receiverId, methodNames, allowance);
};
const createAction = (action) => {
    switch (action.type) {
        case "CreateAccount":
            return near_api_js_1.transactions.createAccount();
        case "DeployContract": {
            const { code } = action.params;
            return near_api_js_1.transactions.deployContract(code);
        }
        case "FunctionCall": {
            const { methodName, args, gas, deposit } = action.params;
            return near_api_js_1.transactions.functionCall(methodName, args, new bn_js_1.default(gas), new bn_js_1.default(deposit));
        }
        case "Transfer": {
            const { deposit } = action.params;
            return near_api_js_1.transactions.transfer(new bn_js_1.default(deposit));
        }
        case "Stake": {
            const { stake, publicKey } = action.params;
            return near_api_js_1.transactions.stake(new bn_js_1.default(stake), near_api_js_1.utils.PublicKey.from(publicKey));
        }
        case "AddKey": {
            const { publicKey, accessKey } = action.params;
            return near_api_js_1.transactions.addKey(near_api_js_1.utils.PublicKey.from(publicKey), 
            // TODO: Use accessKey.nonce? near-api-js seems to think 0 is fine?
            getAccessKey(accessKey.permission));
        }
        case "DeleteKey": {
            const { publicKey } = action.params;
            return near_api_js_1.transactions.deleteKey(near_api_js_1.utils.PublicKey.from(publicKey));
        }
        case "DeleteAccount": {
            const { beneficiaryId } = action.params;
            return near_api_js_1.transactions.deleteAccount(beneficiaryId);
        }
        default:
            throw new Error("Invalid action type");
    }
};
exports.transaction_utils = {
    deserializeTransactionsFromString,
    parseNearApiTrxActionToIndexType,
    parseNearApiTrxToIndexType,
    calcTotalTokenInTransactions,
    tryAddParseActionArgsJsonForTrx,
    tryParseArgsBase64Json,
    createAction,
};
//# sourceMappingURL=transaction_utils.js.map