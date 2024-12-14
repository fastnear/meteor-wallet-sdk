"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INear_ExecutionStatusBasic = exports.INear_FinalExecutionStatusBasic = exports.ENearProofDirection = exports.EGasCostCategory = exports.EGasCostType = void 0;
var EGasCostType;
(function (EGasCostType) {
    EGasCostType["FUNCTION_CALL"] = "FUNCTION_CALL";
    EGasCostType["NEW_RECEIPT"] = "NEW_RECEIPT";
    EGasCostType["BASE"] = "BASE";
    EGasCostType["CONTRACT_LOADING_BASE"] = "CONTRACT_LOADING_BASE";
    EGasCostType["CONTRACT_LOADING_BYTES"] = "CONTRACT_LOADING_BYTES";
    EGasCostType["LOG_BASE"] = "LOG_BASE";
    EGasCostType["LOG_BYTE"] = "LOG_BYTE";
    EGasCostType["PROMISE_RETURN"] = "PROMISE_RETURN";
    EGasCostType["READ_MEMORY_BASE"] = "READ_MEMORY_BASE";
    EGasCostType["READ_MEMORY_BYTE"] = "READ_MEMORY_BYTE";
    EGasCostType["READ_REGISTER_BASE"] = "READ_REGISTER_BASE";
    EGasCostType["READ_REGISTER_BYTE"] = "READ_REGISTER_BYTE";
    EGasCostType["UTF8_DECODING_BASE"] = "UTF8_DECODING_BASE";
    EGasCostType["UTF8_DECODING_BYTE"] = "UTF8_DECODING_BYTE";
    EGasCostType["WASM_INSTRUCTION"] = "WASM_INSTRUCTION";
    EGasCostType["WRITE_MEMORY_BASE"] = "WRITE_MEMORY_BASE";
    EGasCostType["WRITE_MEMORY_BYTE"] = "WRITE_MEMORY_BYTE";
    EGasCostType["WRITE_REGISTER_BASE"] = "WRITE_REGISTER_BASE";
    EGasCostType["WRITE_REGISTER_BYTE"] = "WRITE_REGISTER_BYTE";
    EGasCostType["STORAGE_READ_BASE"] = "STORAGE_READ_BASE";
    EGasCostType["STORAGE_READ_KEY_BYTE"] = "STORAGE_READ_KEY_BYTE";
    EGasCostType["STORAGE_READ_VALUE_BYTE"] = "STORAGE_READ_VALUE_BYTE";
    EGasCostType["STORAGE_WRITE_BASE"] = "STORAGE_WRITE_BASE";
    EGasCostType["STORAGE_WRITE_EVICTED_BYTE"] = "STORAGE_WRITE_EVICTED_BYTE";
    EGasCostType["STORAGE_WRITE_KEY_BYTE"] = "STORAGE_WRITE_KEY_BYTE";
    EGasCostType["STORAGE_WRITE_VALUE_BYTE"] = "STORAGE_WRITE_VALUE_BYTE";
    EGasCostType["TOUCHING_TRIE_NODE"] = "TOUCHING_TRIE_NODE";
    EGasCostType["ECRECOVER_BASE"] = "ECRECOVER_BASE";
    EGasCostType["KECCAK256_BASE"] = "KECCAK256_BASE";
    EGasCostType["KECCAK256_BYTE"] = "KECCAK256_BYTE";
})(EGasCostType = exports.EGasCostType || (exports.EGasCostType = {}));
var EGasCostCategory;
(function (EGasCostCategory) {
    EGasCostCategory["ACTION_COST"] = "ACTION_COST";
    EGasCostCategory["WASM_HOST_COST"] = "WASM_HOST_COST";
})(EGasCostCategory = exports.EGasCostCategory || (exports.EGasCostCategory = {}));
var ENearProofDirection;
(function (ENearProofDirection) {
    ENearProofDirection["Right"] = "Right";
    ENearProofDirection["Left"] = "Left";
})(ENearProofDirection = exports.ENearProofDirection || (exports.ENearProofDirection = {}));
var INear_FinalExecutionStatusBasic;
(function (INear_FinalExecutionStatusBasic) {
    INear_FinalExecutionStatusBasic["NotStarted"] = "NotStarted";
    INear_FinalExecutionStatusBasic["Started"] = "Started";
    INear_FinalExecutionStatusBasic["Failure"] = "Failure";
})(INear_FinalExecutionStatusBasic = exports.INear_FinalExecutionStatusBasic || (exports.INear_FinalExecutionStatusBasic = {}));
var INear_ExecutionStatusBasic;
(function (INear_ExecutionStatusBasic) {
    INear_ExecutionStatusBasic["Unknown"] = "Unknown";
    INear_ExecutionStatusBasic["Pending"] = "Pending";
    INear_ExecutionStatusBasic["Failure"] = "Failure";
})(INear_ExecutionStatusBasic = exports.INear_ExecutionStatusBasic || (exports.INear_ExecutionStatusBasic = {}));
//# sourceMappingURL=near_blockchain_data_types.js.map