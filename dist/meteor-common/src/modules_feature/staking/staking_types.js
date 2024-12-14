"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EStakingView = exports.EValidatorVersion = exports.EStakingType = void 0;
/*******************************/
//
// 						ENUM
//
/*******************************/
var EStakingType;
(function (EStakingType) {
    EStakingType["normal"] = "normal";
    EStakingType["liquid"] = "liquid";
})(EStakingType = exports.EStakingType || (exports.EStakingType = {}));
var EValidatorVersion;
(function (EValidatorVersion) {
    EValidatorVersion["normal"] = "normal";
    EValidatorVersion["farming"] = "farming";
})(EValidatorVersion = exports.EValidatorVersion || (exports.EValidatorVersion = {}));
var EStakingView;
(function (EStakingView) {
    EStakingView["STAKE_VIEW_METHOD"] = "stake_view_method";
    EStakingView["STAKE_VIEW_LIST"] = "stake_view_list";
    EStakingView["STAKE_VIEW_STAKE"] = "stake_view_stake";
    EStakingView["STAKE_VIEW_LIQUID_STAKE"] = "stake_view_liquid_stake";
    EStakingView["STAKE_VIEW_CONFIRM_STAKING"] = "stake_view_confirm_staking";
    EStakingView["STAKE_VIEW_LIQUID_UNSTAKE"] = "stake_view_liquid_unstake";
    EStakingView["STAKE_VIEW_CONFIRM_UNSTAKING"] = "stake_view_confirm_unstaking";
    EStakingView["STAKE_VIEW_SELECT_PROVIDER"] = "stake_view_select_provider";
})(EStakingView = exports.EStakingView || (exports.EStakingView = {}));
//# sourceMappingURL=staking_types.js.map