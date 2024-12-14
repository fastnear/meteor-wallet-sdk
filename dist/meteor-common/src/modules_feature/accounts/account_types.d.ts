import { ENearNetwork } from "../../modules_external/near/types/near_basic_types";
import { IWithAccountIdAndNetwork } from "../../modules_external/near/types/near_input_helper_types";
import { INep0413_SignedMessage } from "../../modules_external/near/types/standards/wallet_standard_types";
import { ESupportedHardwareWalletType } from "../hardware_wallet/hardware_wallet_types";
import { IAccountRecovery_SeedPhrase } from "../../modules_app_core/state/app_store/AppStore_types";
export interface IAccountFullAccessKey {
    keyType?: EAccountKeyType.LOCAL_PRIVATE_KEY;
    privateKey: string;
    publicKey: string;
    phrase?: string;
    recovery?: IAccountRecovery_SeedPhrase;
}
export interface IAccountHardwareKey_Ledger {
    keyType: EAccountKeyType.HARDWARE;
    hardwareType: ESupportedHardwareWalletType.LEDGER;
    publicKey: string;
    path: string;
}
export type TAccountKey_Old = (IAccountFullAccessKey & {
    keyType: EAccountKeyType.LOCAL_PRIVATE_KEY;
}) | IAccountHardwareKey_Ledger;
export interface IAccountSecretData_LocalPrivateKey {
    type?: EAccountKeyType.LOCAL_PRIVATE_KEY;
    privateKey: string;
    publicKey: string;
    phrase?: string;
    recovery?: IAccountRecovery_SeedPhrase;
    allKeys?: IAccountFullAccessKey[];
}
export interface IAccountSecretData_Hardware {
    type: EAccountKeyType.HARDWARE;
}
export type TAccountSecretData = IAccountSecretData_LocalPrivateKey | IAccountSecretData_Hardware;
export declare enum EAccountKeyType {
    LOCAL_PRIVATE_KEY = "LOCAL_PRIVATE_KEY",
    HARDWARE = "HARDWARE",
    WEB3AUTH = "WEB3AUTH"
}
interface IAccountKeyItem_Base {
    label?: string;
    publicKey: string;
    isPrimary: boolean;
}
export declare enum EDecryptionKeyType {
    DIRECT = "DIRECT",
    HASHED_SHA256_SALTED = "HASHED_SHA256_SALTED"
}
export interface IAccountKeyItem_PasswordEncryptedPrivate_SensitiveData {
    privateKey: string;
    recovery?: IAccountRecovery_SeedPhrase;
}
export interface IAccountKeyItem_PasswordEncryptedPrivate extends IAccountKeyItem_Base {
    keyType: EAccountKeyType.LOCAL_PRIVATE_KEY;
    keyMeta: {
        knownSeedPhrase: boolean;
    };
    /**
     * Holds the private key (and seed phrase if we know about it)
     */
    encryption: {
        salt: string;
        encrypted: string;
    };
    sensitive?: IAccountKeyItem_PasswordEncryptedPrivate_SensitiveData;
}
interface IWeb3AuthUserDetails {
    typeOfLogin: string;
    name: string;
    email: string;
    profileImage: string;
    verifier: string;
    verifierId: string;
    aggregateVerifier: string;
}
export interface IAccountKeyItem_Web3Auth_SensitiveData {
    privateKey: string;
    userDetails: IWeb3AuthUserDetails;
}
export interface IAccountKeyItem_Web3Auth extends IAccountKeyItem_Base {
    keyType: EAccountKeyType.WEB3AUTH;
    /**
     * Holds the private key that we've received from Web3Auth
     * (user doesn't need to sign in with web3auth again...)
     */
    encryption: {
        salt: string;
        encrypted: string;
    };
    sensitive?: IAccountKeyItem_Web3Auth_SensitiveData;
}
export interface IAccountKeyItem_HardwareWallet extends IAccountKeyItem_Base {
    keyType: EAccountKeyType.HARDWARE;
    hardwareType: ESupportedHardwareWalletType;
    path: string;
}
export type TAccountKeyItem = IAccountKeyItem_PasswordEncryptedPrivate | IAccountKeyItem_HardwareWallet | IAccountKeyItem_Web3Auth;
export type TAccountKeyItem_PasswordEncryptedPrivate_SignedIn = IAccountKeyItem_PasswordEncryptedPrivate & {
    sensitive: IAccountKeyItem_PasswordEncryptedPrivate_SensitiveData;
};
export type TAccountKeyItem_Web3Auth_SignedIn = IAccountKeyItem_Web3Auth & {
    sensitive: IAccountKeyItem_Web3Auth_SensitiveData;
};
export type TSignedInAccountKeyItem = TAccountKeyItem_PasswordEncryptedPrivate_SignedIn | TAccountKeyItem_Web3Auth_SignedIn | IAccountKeyItem_HardwareWallet;
type TAccountKeyItem_PasswordEncryptedPrivate_NewKey = Pick<TAccountKeyItem_PasswordEncryptedPrivate_SignedIn, "sensitive" | "keyType" | "label" | "isPrimary" | "publicKey">;
type TAccountKeyItem_Web3Auth_NewKey = Pick<TAccountKeyItem_Web3Auth_SignedIn, "sensitive" | "keyType" | "label" | "isPrimary" | "publicKey">;
export type TAccountKeyItem_NewKey = TAccountKeyItem_PasswordEncryptedPrivate_NewKey | TAccountKeyItem_Web3Auth_NewKey | IAccountKeyItem_HardwareWallet;
export declare enum EAccountProfileType {
    LOCAL = "LOCAL",
    NEAR_SOCIAL = "NEAR_SOCIAL"
}
export declare enum EAccountFundingStatus {
    UNFUNDED = "UNFUNDED",
    FUNDED = "FUNDED"
}
export declare enum EAccountFunctionality {
    SEED_PHRASE_RECOVERY = "SEED_PHRASE_RECOVERY"
}
export interface IAccountAllowVerifyHost {
    dateAllowed: Date;
    host: string;
    publicKeyUsed: string;
}
export interface IAccountPublicKeyLabel {
    publicKey: string;
    label?: string;
}
export declare enum EGetKeysPermissionType {
    ALL = "ALL",
    FULL_ACCESS = "FULL_ACCESS",
    FUNCTION_CALL = "FUNCTION_CALL"
}
export declare enum EAccountIdentifierType {
    IMPLICIT = "IMPLICIT",
    NAMED = "NAMED"
}
export declare enum EAccountImportType {
    SEED_PHRASE = "SEED_PHRASE",
    BATCH_IMPORT_PRIVATE_KEY = "BATCH_IMPORT_PRIVATE_KEY",
    PRIVATE_KEY = "PRIVATE_KEY"
}
export interface IAccountKeyMeta_Ledger {
    keyType: EAccountKeyType.HARDWARE;
    hardwareType: ESupportedHardwareWalletType.LEDGER;
    data: IAccountHardwareKey_Ledger;
}
export interface IAccountKeyMeta_LocalPrivate {
    keyType: EAccountKeyType.LOCAL_PRIVATE_KEY;
}
export interface IAccount_Base {
    id: string;
    num: number;
    label?: string;
    namedPart?: string;
    fundingStatus: EAccountFundingStatus;
    type: EAccountIdentifierType;
    dateAdded: Date;
    network: ENearNetwork;
}
export type TAccountKeyMeta = IAccountKeyMeta_Ledger | IAccountKeyMeta_LocalPrivate;
export interface IAccount_Old extends IAccount_Base {
    hashId: string;
    salt: string;
    profileId: string;
    passwordMatchHash: string;
    passwordEncryptKeyType?: EDecryptionKeyType;
    encrypted: string;
    keyMeta?: TAccountKeyMeta;
    accessKeyLabels?: IAccountPublicKeyLabel[];
    functionality: EAccountFunctionality[];
    allowVerifyHosts?: IAccountAllowVerifyHost[];
}
export interface ISignedInSessionAccount_Old extends Omit<IAccount_Old, "decrypted"> {
    decrypted: TAccountSecretData;
    needsToBackupSeedPhrase: boolean;
}
export interface ISelectedAccountDecrypted extends ISignedInSessionAccount_Old {
    isDecrypted: true;
    needsToBackupSeedPhrase: boolean;
}
export interface ISelectedAccountNotDecrypted extends IAccount_Old {
    isDecrypted: false;
    decrypted?: undefined;
    needsToBackupSeedPhrase?: undefined;
}
export type TSelectedAccount = ISelectedAccountDecrypted | ISelectedAccountNotDecrypted;
export interface IAccount_New extends IAccount_Base {
    keyData: TAccountKeyItem[];
}
export interface ISignedInSessionAccount_New extends IAccount_New {
    signedInKeyData: TSignedInAccountKeyItem;
}
export interface IAccountSignedRequestInputs<T> extends IWithAccountIdAndNetwork {
    inputs: T;
    signed: INep0413_SignedMessage;
    nonce: number[];
    receiver: string;
}
export declare enum EProfileStatus {
    FRESH = "FRESH",
    SET_UP = "SET_UP"
}
export interface IProfileAddress_Base {
    network: ENearNetwork;
    dateUsed: Date;
    id: string;
}
export interface IProfileAddressSaved extends IProfileAddress_Base {
    label: string;
    desc?: string;
    dateAdded: Date;
}
export interface IProfileAddressRecent extends IProfileAddress_Base {
    contractName: string;
    type: "ft" | "nft";
    symbol?: string;
    amount?: string;
    decimals?: number;
    tokenId?: string;
}
export interface IUserAddressBook {
    recentlyUsed: IProfileAddressRecent[];
    saved: IProfileAddressSaved[];
}
export type TWalletUserKnownExternalKey = IAccountKeyItem_Web3Auth | IAccountKeyItem_HardwareWallet;
export type TWalletUserKnownExternalKeySignedIn = TAccountKeyItem_Web3Auth_SignedIn | IAccountKeyItem_HardwareWallet;
export declare enum EWalletUserVersion {
    V202301 = "V202301"
}
export interface IAppUserProfile_Old {
    id: string;
    profileVersion?: undefined;
    currentAccountNum: number;
    profileSalt?: string;
    passwordMatchHash?: string;
    status: EProfileStatus;
    addresses: IUserAddressBook;
}
export interface IAppWalletUser_New {
    id: string;
    walletUserVersion: EWalletUserVersion.V202301;
    currentAccountNum: number;
    userSalt: string;
    passwordMatchHash?: string;
    addresses: IUserAddressBook;
    selectedAccountId?: string;
    accounts: IAccount_New[];
    knownExternalKeys: TWalletUserKnownExternalKey[];
}
export interface INewPasswordData {
    paddedPasswordHash: string;
    matchHash: string;
    cipherHash: string;
}
export interface ISignedInWalletUserData {
    paddedPasswordHash: string;
    selectedAccount?: ISignedInSessionAccount_New;
    signedInAccounts: ISignedInSessionAccount_New[];
    signedInExternalKeys: TWalletUserKnownExternalKeySignedIn[];
}
export declare enum EAccountErrorType {
    invalid_account = "invalid_account"
}
export {};
