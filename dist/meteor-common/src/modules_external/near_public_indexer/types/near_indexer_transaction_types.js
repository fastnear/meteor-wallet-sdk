"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENearIndexer_ActionKind = exports.ENearIndexer_TransactionStatus = void 0;
var ENearIndexer_TransactionStatus;
(function (ENearIndexer_TransactionStatus) {
    ENearIndexer_TransactionStatus["SUCCESS_VALUE"] = "SUCCESS_VALUE";
    ENearIndexer_TransactionStatus["SUCCESS_RECEIPT_ID"] = "SUCCESS_RECEIPT_ID";
    ENearIndexer_TransactionStatus["FAILURE"] = "FAILURE";
    ENearIndexer_TransactionStatus["UNKNOWN"] = "UNKNOWN";
})(ENearIndexer_TransactionStatus = exports.ENearIndexer_TransactionStatus || (exports.ENearIndexer_TransactionStatus = {}));
var ENearIndexer_ActionKind;
(function (ENearIndexer_ActionKind) {
    ENearIndexer_ActionKind["CREATE_ACCOUNT"] = "CREATE_ACCOUNT";
    ENearIndexer_ActionKind["DELETE_ACCOUNT"] = "DELETE_ACCOUNT";
    ENearIndexer_ActionKind["DEPLOY_CONTRACT"] = "DEPLOY_CONTRACT";
    ENearIndexer_ActionKind["FUNCTION_CALL"] = "FUNCTION_CALL";
    ENearIndexer_ActionKind["STAKE"] = "STAKE";
    ENearIndexer_ActionKind["TRANSFER"] = "TRANSFER";
    ENearIndexer_ActionKind["ADD_KEY"] = "ADD_KEY";
    ENearIndexer_ActionKind["DELETE_KEY"] = "DELETE_KEY";
})(ENearIndexer_ActionKind = exports.ENearIndexer_ActionKind || (exports.ENearIndexer_ActionKind = {}));
//# sourceMappingURL=near_indexer_transaction_types.js.map