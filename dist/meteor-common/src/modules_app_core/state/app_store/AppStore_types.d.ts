import type { FinalExecutionOutcome } from "near-api-js/lib/providers";
import Big from "big.js";
import { EStakingType, TStakedValidator, TValidatorDetails } from "../../../modules_feature/staking/staking_types";
import { EMeteorAnalytics_AppReleaseEnvironment } from "../../../modules_utility/analytics/meteor_analytics_enums";
import { EDappActionSource, IAccountSyncStatus, IDappAction_Login, IDappAction_Logout, IDappAction_SignMessage, IDappAction_SignTransaction, IDappAction_VerifyOwner } from "../../../modules_feature/dapp_connect/types_dappConnect";
import { ELanguage } from "../../translation/translation_types";
import { EAccountIdentifierType, IAccount_Old, IAppUserProfile_Old, IAppWalletUser_New, ISignedInSessionAccount_Old, ISignedInWalletUserData, TSelectedAccount } from "../../../modules_feature/accounts/account_types";
import { IMeteorFungibleTokenWithPrice } from "../../../modules_feature/fungible_tokens/fungible_tokens_types";
import { IAppThemeBaseVariables } from "../../theme/theme_types";
import { EAppPlatformType } from "../../app_plaftorms/app_platform_types";
import { ENearNetwork } from "../../../modules_external/near/types/near_basic_types";
import { IKeypomAction_Claim } from "../../../modules_feature/linkdrop/keypom_types";
import { EFeatureEnrollmentRecord_ConsentStatus } from "../../../modules_feature/missions/feature_enrollment_records/feature_enrollment_records.enum";
export interface IWizardSection_CreatePassword {
    isValid: boolean;
    typedPassword: string;
    confirmedPassword?: string;
    passwordStrength: number;
    passwordIssue: number;
}
export declare enum EChangePasswordWizardProgress {
    P0_OLD_PASSWORD = 0,
    P1_NEW_PASSWORD = 1,
    P2_SUCCESS = 2
}
export interface IWizardSection_ChangePassword {
    progress: EChangePasswordWizardProgress;
    oldPassword: string;
    createNewPassword: IWizardSection_CreatePassword;
}
export declare enum EBackupSeedPhraseWizardProgress {
    PASSWORD = 0,
    VALIDATE = 1,
    CONFIRM = 2,
    SUCCESS = 3
}
export interface IWizardSection_BackupSeedPhrase {
    progress: EBackupSeedPhraseWizardProgress;
}
export declare enum ERecoveryType {
    seed_phrase = "seed_phrase"
}
export interface IAccountRecovery_SeedPhrase {
    type: ERecoveryType.seed_phrase;
    seedPhrase: string;
    isBackedUp: boolean;
}
export declare enum EEnrollmentDataStatusExtras {
    checking = "checking",
    accepted_but_waiting = "accepted_but_waiting",
    rejected_but_waiting = "rejected_but_waiting",
    failed_acceptance = "failed_acceptance",
    failed_rejection = "failed_rejection"
}
export type TEnrollmentDataStatus = EFeatureEnrollmentRecord_ConsentStatus | EEnrollmentDataStatusExtras;
export interface IEnrollmentData {
    status: TEnrollmentDataStatus;
    publicKey?: string;
    errorMessage?: string;
}
interface IWizard_NewAccount_Base {
    acceptedTerms: boolean;
}
interface IWizard_NewAccount_Common {
    recovery?: IAccountRecovery_SeedPhrase;
    setPassword?: string;
}
export declare enum EWalletImportInputType {
    SECRET_PHRASE = "SECRET_PHRASE",
    PRIVATE_KEY = "PRIVATE_KEY"
}
export declare enum EImportAccountProgress {
    P0_START_INPUT_PWD = 0,
    P1_CHOOSE_INPUT_TYPE = 1,
    P2_INPUT_DATA = 2,
    P3_CONFIRM_ACCOUNT_IMPORT = 3,
    P4_CREATED_SUCCESS = 4
}
export declare enum EAutoImportAccountProgress {
    P0_START_INPUT_PWD = 0,
    P1_CONFIRM_ACCOUNT_IMPORT = 1,
    P2_IMPORTED_SUCCESS = 2
}
export interface IWizard_ImportAccount {
    progress: EImportAccountProgress;
    importType: EWalletImportInputType;
    setNetwork?: ENearNetwork;
    setPassword?: string;
    setPhrase?: string;
    setPrivateKey?: string;
    setAccountId?: string;
    foundAccountIds: string[];
}
export interface IWizard_AutoImportAccount {
    progress: EAutoImportAccountProgress;
    setNetwork?: ENearNetwork;
    setPassword?: string;
    setPrivateKey?: string;
    setAccountId?: string;
    foundAccountIds: string[];
}
export interface IAppSessionState {
    isSignedIn: boolean;
    signedInProfileId?: string;
}
export interface IAccountSendFtState {
    amount: string;
    usdAmount: string;
    selectedContractName: string;
    selectedContractSymbol: string;
    receiverId: string;
    successTransactionId?: string;
    finalExecutionOutcome?: FinalExecutionOutcome;
}
export interface IAccountSendNftState {
    tokenId: string;
    selectedContractName: string;
    receiverId: string;
    successTransactionId?: string;
    finalExecutionOutcome?: FinalExecutionOutcome;
}
export interface IAccountStakeNearState {
    view: string;
    stakingType: EStakingType;
    nearAmount?: Big;
    nearPrice?: number;
    receiveTokenAmount?: Big;
    receiveTokenPrice?: number;
    validator?: TValidatorDetails;
}
export interface IAccountUnstakeState {
    selectedUnstakedValidator?: TStakedValidator;
    unstakeAmountInput?: Big;
    nearToken?: IMeteorFungibleTokenWithPrice;
    unstakeToken?: IMeteorFungibleTokenWithPrice;
    minimumAmountOutput?: Big;
}
export interface IBatchImportAccount {
    accountId: string;
    secretKey: string;
    label?: string;
}
export declare enum EBatchImportProgress {
    P0_LANDING_DECRYPT = 0,
    P1_CONFIRM_PASSWORD = 1,
    P2_CONFIRM_ACCOUNT_IMPORT = 2,
    P3_IMPORT_SUCCESS = 3
}
export interface IBatchImportState {
    progress: EBatchImportProgress;
    hash: string;
    network: ENearNetwork;
    decryptionKey?: string;
    importAccounts?: IBatchImportAccount[];
    chosenPassword?: string;
}
export declare enum EExtensionStatus {
    NOT_DETECTED = "NOT_DETECTED",
    DETECTED = "DETECTED",
    DETECTED_MATCHING_HASH = "DETECTED_MATCHING_HASH",
    DETECTED_NO_MATCH_HASH = "DETECTED_NO_MATCH_HASH"
}
export interface IMeteorExtensionSetFeatures {
    batchImport: boolean;
    openPage: boolean;
    syncCheck: boolean;
    syncAccounts: boolean;
}
export interface IExtensionSync {
    detected: boolean;
    status: EExtensionStatus;
    accountSyncStatus: IAccountSyncStatus;
    features: string[];
    setFeatures: IMeteorExtensionSetFeatures;
}
export declare enum EWalletEncryptionType {
    insecure_key = "insecure_key",
    set_password = "set_password"
}
export type TWalletEncryption = {
    type: EWalletEncryptionType.insecure_key;
    insecureKey: string;
} | {
    type: EWalletEncryptionType.set_password;
    insecureKey?: undefined;
};
export interface IDeviceInfo {
    windowIsSmall: boolean;
}
export declare enum ECreateAccountProgress {
    P0_START_INPUT_PWD = 0,
    P1_PICK_WALLET_NAME = 1,
    P2_GEN_PHASE = 2,
    P3_CONFIRM_PHASE = 3,
    P4_WALLET_FUNDING = 4,
    P5_CREATED_SUCCESS = 5
}
export interface IWizard_CreateAccount extends IWizard_NewAccount_Base {
    progress: ECreateAccountProgress;
    accountIdType: EAccountIdentifierType;
    initialFundingAmount: number;
    setNamedAccountId?: string;
    setFundingAccountId?: string;
}
export type TExternalAction = IDappAction_Login | IDappAction_SignTransaction | IDappAction_Logout | IDappAction_VerifyOwner | IKeypomAction_Claim | IDappAction_SignMessage;
export interface IAppStore {
    deviceInfo: IDeviceInfo;
    appDriver: EAppPlatformType;
    appVersion: string;
    appRelease: EMeteorAnalytics_AppReleaseEnvironment;
    externalActionSource?: EDappActionSource;
    externalActions: TExternalAction[];
    extensionSync: IExtensionSync;
    batchImportState?: IBatchImportState;
    sendFtState: {
        [accountId: string]: IAccountSendFtState;
    };
    sendNftState: {
        [accountId: string]: IAccountSendNftState;
    };
    stakeNearState: IAccountStakeNearState;
    unstakeNearState: {
        [accountId: string]: IAccountUnstakeState;
    };
    language: ELanguage;
    theme: IAppThemeBaseVariables;
    wizards: {
        common: IWizard_NewAccount_Common;
        createAccount: IWizard_CreateAccount;
        importAccount: IWizard_ImportAccount;
        autoImportAccount: IWizard_AutoImportAccount;
        createPassword: IWizardSection_CreatePassword;
        changePassword: IWizardSection_ChangePassword;
        backupSeedPhrase: IWizardSection_BackupSeedPhrase;
    };
    allAccounts: IAccount_Old[];
    currentProfileAccounts: IAccount_Old[];
    selectedAccountId?: string;
    currentProfileId: string;
    selectedAccount?: TSelectedAccount;
    profiles: IAppUserProfile_Old[];
    currentProfile: IAppUserProfile_Old;
    walletUser: IAppWalletUser_New;
    signedInWalletUser?: ISignedInWalletUserData;
    sessionId: string;
    sessionAccounts: {
        [id: string]: ISignedInSessionAccount_Old;
    };
    sessionState: IAppSessionState;
    localStorageSessionState: {
        state?: {
            passwordEncryptKeyHash: string;
            passwordMatchHash: string;
            signedInProfileId: string;
        };
        newState?: {
            paddedPasswordHash: string;
        };
        lastTouched?: number;
    };
    selectedNetwork: ENearNetwork;
    quest: {
        isAccepted: boolean | null;
        completedTime: string;
    };
    meteorFeatureEnrollment: {
        [walletId: string]: IEnrollmentData;
    };
    walletEncryption: TWalletEncryption;
}
export {};
