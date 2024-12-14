"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NEAR_SAFE_IGNORE_AMOUNT_YOCTO = exports.NEAR_PESSIMISTIC_GAS_REGULAR_NUM = exports.NEAR_DECIMALS = exports.NEAR_SYM_ONE_WORD = exports.NEAR_SYM = exports.NEAR_MIN_BALANCE_FOR_CREATE = exports.NEAR_MIN_BALANCE_FOR_GAS = exports.NEAR_MIN_BALANCE_FOR_GAS_REGULAR_NUM = void 0;
const near_api_js_1 = require("near-api-js");
exports.NEAR_MIN_BALANCE_FOR_GAS_REGULAR_NUM = 0.05;
exports.NEAR_MIN_BALANCE_FOR_GAS = near_api_js_1.utils.format.parseNearAmount(`${exports.NEAR_MIN_BALANCE_FOR_GAS_REGULAR_NUM}`);
exports.NEAR_MIN_BALANCE_FOR_CREATE = near_api_js_1.utils.format.parseNearAmount("0.1");
exports.NEAR_SYM = "NEAR";
exports.NEAR_SYM_ONE_WORD = "Ⓝ";
exports.NEAR_DECIMALS = 24;
exports.NEAR_PESSIMISTIC_GAS_REGULAR_NUM = 0.2;
// For value smaller than this we would assume it's 0
exports.NEAR_SAFE_IGNORE_AMOUNT_YOCTO = "10000000000000";
//# sourceMappingURL=near_constants.js.map