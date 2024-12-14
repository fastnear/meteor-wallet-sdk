"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EMeteorAnalytics_AppReleaseEnvironment = exports.EMeteorAnalytics_SubType_UserAction = exports.EMeteorAnalytics_SubType_WalletAction = exports.EMeteorAnalytics_EventType = exports.EDataVersion = void 0;
var EDataVersion;
(function (EDataVersion) {
    EDataVersion["initial"] = "0";
    EDataVersion["_2022112400"] = "2022112400";
})(EDataVersion = exports.EDataVersion || (exports.EDataVersion = {}));
var EMeteorAnalytics_EventType;
(function (EMeteorAnalytics_EventType) {
    EMeteorAnalytics_EventType["test"] = "test";
    EMeteorAnalytics_EventType["page_view"] = "page_view";
    EMeteorAnalytics_EventType["app_hidden"] = "app_hidden";
    EMeteorAnalytics_EventType["app_visible"] = "app_visible";
    EMeteorAnalytics_EventType["user_action"] = "user_action";
    EMeteorAnalytics_EventType["wallet_action"] = "wallet_action";
    EMeteorAnalytics_EventType["initialized"] = "initialized";
})(EMeteorAnalytics_EventType = exports.EMeteorAnalytics_EventType || (exports.EMeteorAnalytics_EventType = {}));
var EMeteorAnalytics_SubType_WalletAction;
(function (EMeteorAnalytics_SubType_WalletAction) {
    EMeteorAnalytics_SubType_WalletAction["send_near"] = "send_near";
    EMeteorAnalytics_SubType_WalletAction["send_ft"] = "send_ft";
    EMeteorAnalytics_SubType_WalletAction["send_nft"] = "send_nft";
    EMeteorAnalytics_SubType_WalletAction["swap"] = "swap";
    EMeteorAnalytics_SubType_WalletAction["normal_stake"] = "normal_stake";
    EMeteorAnalytics_SubType_WalletAction["normal_unstake"] = "normal_unstake";
    EMeteorAnalytics_SubType_WalletAction["liquid_stake"] = "liquid_stake";
    EMeteorAnalytics_SubType_WalletAction["liquid_unstake"] = "liquid_unstake";
    EMeteorAnalytics_SubType_WalletAction["liquid_delayed_unstake"] = "liquid_delayed_unstake";
    EMeteorAnalytics_SubType_WalletAction["import_wallet"] = "import_wallet";
    EMeteorAnalytics_SubType_WalletAction["create_wallet"] = "create_wallet";
    EMeteorAnalytics_SubType_WalletAction["sign_transaction_request"] = "sign_transaction_request";
    EMeteorAnalytics_SubType_WalletAction["sign_transaction_ok"] = "sign_transaction_ok";
    EMeteorAnalytics_SubType_WalletAction["sign_transaction_fail"] = "sign_transaction_fail";
    EMeteorAnalytics_SubType_WalletAction["sign_in_dapp_request"] = "sign_in_dapp_request";
    EMeteorAnalytics_SubType_WalletAction["sign_in_dapp_ok"] = "sign_in_dapp_ok";
    EMeteorAnalytics_SubType_WalletAction["sign_in_dapp_fail"] = "sign_in_dapp_fail";
    EMeteorAnalytics_SubType_WalletAction["sign_out_dapp_request"] = "sign_out_dapp_request";
    EMeteorAnalytics_SubType_WalletAction["sign_out_dapp_ok"] = "sign_out_dapp_ok";
    EMeteorAnalytics_SubType_WalletAction["sign_out_dapp_fail"] = "sign_out_dapp_fail";
})(EMeteorAnalytics_SubType_WalletAction = exports.EMeteorAnalytics_SubType_WalletAction || (exports.EMeteorAnalytics_SubType_WalletAction = {}));
var EMeteorAnalytics_SubType_UserAction;
(function (EMeteorAnalytics_SubType_UserAction) {
    EMeteorAnalytics_SubType_UserAction["unlock"] = "unlock";
    EMeteorAnalytics_SubType_UserAction["change_network"] = "change_network";
    EMeteorAnalytics_SubType_UserAction["change_theme"] = "change_theme";
    EMeteorAnalytics_SubType_UserAction["change_language"] = "change_language";
    EMeteorAnalytics_SubType_UserAction["voter_registration_attempt"] = "voter_registration_attempt";
    EMeteorAnalytics_SubType_UserAction["voter_registration_onboarded"] = "voter_registration_onboarded";
    EMeteorAnalytics_SubType_UserAction["button_click"] = "button_click";
})(EMeteorAnalytics_SubType_UserAction = exports.EMeteorAnalytics_SubType_UserAction || (exports.EMeteorAnalytics_SubType_UserAction = {}));
var EMeteorAnalytics_AppReleaseEnvironment;
(function (EMeteorAnalytics_AppReleaseEnvironment) {
    EMeteorAnalytics_AppReleaseEnvironment["dev_local"] = "dev_local";
    EMeteorAnalytics_AppReleaseEnvironment["dev_live"] = "dev_live";
    EMeteorAnalytics_AppReleaseEnvironment["staging_live"] = "staging_live";
    EMeteorAnalytics_AppReleaseEnvironment["production"] = "production";
})(EMeteorAnalytics_AppReleaseEnvironment = exports.EMeteorAnalytics_AppReleaseEnvironment || (exports.EMeteorAnalytics_AppReleaseEnvironment = {}));
//# sourceMappingURL=meteor_analytics_enums.js.map