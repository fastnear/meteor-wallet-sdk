"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ECreateAccountProgress = exports.EWalletEncryptionType = exports.EExtensionStatus = exports.EBatchImportProgress = exports.EAutoImportAccountProgress = exports.EImportAccountProgress = exports.EWalletImportInputType = exports.EEnrollmentDataStatusExtras = exports.ERecoveryType = exports.EBackupSeedPhraseWizardProgress = exports.EChangePasswordWizardProgress = void 0;
var EChangePasswordWizardProgress;
(function (EChangePasswordWizardProgress) {
    EChangePasswordWizardProgress[EChangePasswordWizardProgress["P0_OLD_PASSWORD"] = 0] = "P0_OLD_PASSWORD";
    EChangePasswordWizardProgress[EChangePasswordWizardProgress["P1_NEW_PASSWORD"] = 1] = "P1_NEW_PASSWORD";
    EChangePasswordWizardProgress[EChangePasswordWizardProgress["P2_SUCCESS"] = 2] = "P2_SUCCESS";
})(EChangePasswordWizardProgress = exports.EChangePasswordWizardProgress || (exports.EChangePasswordWizardProgress = {}));
var EBackupSeedPhraseWizardProgress;
(function (EBackupSeedPhraseWizardProgress) {
    EBackupSeedPhraseWizardProgress[EBackupSeedPhraseWizardProgress["PASSWORD"] = 0] = "PASSWORD";
    EBackupSeedPhraseWizardProgress[EBackupSeedPhraseWizardProgress["VALIDATE"] = 1] = "VALIDATE";
    EBackupSeedPhraseWizardProgress[EBackupSeedPhraseWizardProgress["CONFIRM"] = 2] = "CONFIRM";
    EBackupSeedPhraseWizardProgress[EBackupSeedPhraseWizardProgress["SUCCESS"] = 3] = "SUCCESS";
})(EBackupSeedPhraseWizardProgress = exports.EBackupSeedPhraseWizardProgress || (exports.EBackupSeedPhraseWizardProgress = {}));
var ERecoveryType;
(function (ERecoveryType) {
    ERecoveryType["seed_phrase"] = "seed_phrase";
})(ERecoveryType = exports.ERecoveryType || (exports.ERecoveryType = {}));
var EEnrollmentDataStatusExtras;
(function (EEnrollmentDataStatusExtras) {
    EEnrollmentDataStatusExtras["checking"] = "checking";
    EEnrollmentDataStatusExtras["accepted_but_waiting"] = "accepted_but_waiting";
    EEnrollmentDataStatusExtras["rejected_but_waiting"] = "rejected_but_waiting";
    EEnrollmentDataStatusExtras["failed_acceptance"] = "failed_acceptance";
    EEnrollmentDataStatusExtras["failed_rejection"] = "failed_rejection";
})(EEnrollmentDataStatusExtras = exports.EEnrollmentDataStatusExtras || (exports.EEnrollmentDataStatusExtras = {}));
var EWalletImportInputType;
(function (EWalletImportInputType) {
    EWalletImportInputType["SECRET_PHRASE"] = "SECRET_PHRASE";
    EWalletImportInputType["PRIVATE_KEY"] = "PRIVATE_KEY";
})(EWalletImportInputType = exports.EWalletImportInputType || (exports.EWalletImportInputType = {}));
var EImportAccountProgress;
(function (EImportAccountProgress) {
    EImportAccountProgress[EImportAccountProgress["P0_START_INPUT_PWD"] = 0] = "P0_START_INPUT_PWD";
    EImportAccountProgress[EImportAccountProgress["P1_CHOOSE_INPUT_TYPE"] = 1] = "P1_CHOOSE_INPUT_TYPE";
    EImportAccountProgress[EImportAccountProgress["P2_INPUT_DATA"] = 2] = "P2_INPUT_DATA";
    EImportAccountProgress[EImportAccountProgress["P3_CONFIRM_ACCOUNT_IMPORT"] = 3] = "P3_CONFIRM_ACCOUNT_IMPORT";
    EImportAccountProgress[EImportAccountProgress["P4_CREATED_SUCCESS"] = 4] = "P4_CREATED_SUCCESS";
})(EImportAccountProgress = exports.EImportAccountProgress || (exports.EImportAccountProgress = {}));
var EAutoImportAccountProgress;
(function (EAutoImportAccountProgress) {
    EAutoImportAccountProgress[EAutoImportAccountProgress["P0_START_INPUT_PWD"] = 0] = "P0_START_INPUT_PWD";
    EAutoImportAccountProgress[EAutoImportAccountProgress["P1_CONFIRM_ACCOUNT_IMPORT"] = 1] = "P1_CONFIRM_ACCOUNT_IMPORT";
    EAutoImportAccountProgress[EAutoImportAccountProgress["P2_IMPORTED_SUCCESS"] = 2] = "P2_IMPORTED_SUCCESS";
})(EAutoImportAccountProgress = exports.EAutoImportAccountProgress || (exports.EAutoImportAccountProgress = {}));
var EBatchImportProgress;
(function (EBatchImportProgress) {
    EBatchImportProgress[EBatchImportProgress["P0_LANDING_DECRYPT"] = 0] = "P0_LANDING_DECRYPT";
    EBatchImportProgress[EBatchImportProgress["P1_CONFIRM_PASSWORD"] = 1] = "P1_CONFIRM_PASSWORD";
    EBatchImportProgress[EBatchImportProgress["P2_CONFIRM_ACCOUNT_IMPORT"] = 2] = "P2_CONFIRM_ACCOUNT_IMPORT";
    EBatchImportProgress[EBatchImportProgress["P3_IMPORT_SUCCESS"] = 3] = "P3_IMPORT_SUCCESS";
})(EBatchImportProgress = exports.EBatchImportProgress || (exports.EBatchImportProgress = {}));
var EExtensionStatus;
(function (EExtensionStatus) {
    EExtensionStatus["NOT_DETECTED"] = "NOT_DETECTED";
    EExtensionStatus["DETECTED"] = "DETECTED";
    EExtensionStatus["DETECTED_MATCHING_HASH"] = "DETECTED_MATCHING_HASH";
    EExtensionStatus["DETECTED_NO_MATCH_HASH"] = "DETECTED_NO_MATCH_HASH";
})(EExtensionStatus = exports.EExtensionStatus || (exports.EExtensionStatus = {}));
var EWalletEncryptionType;
(function (EWalletEncryptionType) {
    EWalletEncryptionType["insecure_key"] = "insecure_key";
    EWalletEncryptionType["set_password"] = "set_password";
})(EWalletEncryptionType = exports.EWalletEncryptionType || (exports.EWalletEncryptionType = {}));
var ECreateAccountProgress;
(function (ECreateAccountProgress) {
    ECreateAccountProgress[ECreateAccountProgress["P0_START_INPUT_PWD"] = 0] = "P0_START_INPUT_PWD";
    ECreateAccountProgress[ECreateAccountProgress["P1_PICK_WALLET_NAME"] = 1] = "P1_PICK_WALLET_NAME";
    ECreateAccountProgress[ECreateAccountProgress["P2_GEN_PHASE"] = 2] = "P2_GEN_PHASE";
    ECreateAccountProgress[ECreateAccountProgress["P3_CONFIRM_PHASE"] = 3] = "P3_CONFIRM_PHASE";
    ECreateAccountProgress[ECreateAccountProgress["P4_WALLET_FUNDING"] = 4] = "P4_WALLET_FUNDING";
    ECreateAccountProgress[ECreateAccountProgress["P5_CREATED_SUCCESS"] = 5] = "P5_CREATED_SUCCESS";
})(ECreateAccountProgress = exports.ECreateAccountProgress || (exports.ECreateAccountProgress = {}));
//# sourceMappingURL=AppStore_types.js.map