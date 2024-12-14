"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCHEMA_V2 = void 0;
const crypto_1 = require("@near-js/crypto");
const transactions_1 = require("@near-js/transactions");
exports.SCHEMA_V2 = new Map([
    [
        transactions_1.Signature,
        {
            kind: "struct",
            fields: [
                ["keyType", "u8"],
                ["data", [64]],
            ],
        },
    ],
    [
        transactions_1.SignedTransaction,
        {
            kind: "struct",
            fields: [
                ["transaction", transactions_1.Transaction],
                ["signature", transactions_1.Signature],
            ],
        },
    ],
    [
        transactions_1.Transaction,
        {
            kind: "struct",
            fields: [
                ["signerId", "string"],
                ["publicKey", crypto_1.PublicKey],
                ["nonce", "u64"],
                ["receiverId", "string"],
                ["blockHash", [32]],
                ["actions", [transactions_1.Action]],
            ],
        },
    ],
    [
        crypto_1.PublicKey,
        {
            kind: "struct",
            fields: [
                ["keyType", "u8"],
                ["data", [32]],
            ],
        },
    ],
    [
        transactions_1.AccessKey,
        {
            kind: "struct",
            fields: [
                ["nonce", "u64"],
                ["permission", transactions_1.AccessKeyPermission],
            ],
        },
    ],
    [
        transactions_1.AccessKeyPermission,
        {
            kind: "enum",
            field: "enum",
            values: [
                ["functionCall", transactions_1.FunctionCallPermission],
                ["fullAccess", transactions_1.FullAccessPermission],
            ],
        },
    ],
    [
        transactions_1.FunctionCallPermission,
        {
            kind: "struct",
            fields: [
                ["allowance", { kind: "option", type: "u128" }],
                ["receiverId", "string"],
                ["methodNames", ["string"]],
            ],
        },
    ],
    [transactions_1.FullAccessPermission, { kind: "struct", fields: [] }],
    [
        transactions_1.Action,
        {
            kind: "enum",
            field: "enum",
            values: [
                ["createAccount", transactions_1.CreateAccount],
                ["deployContract", transactions_1.DeployContract],
                ["functionCall", transactions_1.FunctionCall],
                ["transfer", transactions_1.Transfer],
                ["stake", transactions_1.Stake],
                ["addKey", transactions_1.AddKey],
                ["deleteKey", transactions_1.DeleteKey],
                ["deleteAccount", transactions_1.DeleteAccount],
                ["signedDelegate", transactions_1.SignedDelegate],
            ],
        },
    ],
    [transactions_1.CreateAccount, { kind: "struct", fields: [] }],
    [transactions_1.DeployContract, { kind: "struct", fields: [["code", ["u8"]]] }],
    [
        transactions_1.FunctionCall,
        {
            kind: "struct",
            fields: [
                ["methodName", "string"],
                ["args", ["u8"]],
                ["gas", "u64"],
                ["deposit", "u128"],
            ],
        },
    ],
    [transactions_1.Transfer, { kind: "struct", fields: [["deposit", "u128"]] }],
    [
        transactions_1.Stake,
        {
            kind: "struct",
            fields: [
                ["stake", "u128"],
                ["publicKey", crypto_1.PublicKey],
            ],
        },
    ],
    [
        transactions_1.AddKey,
        {
            kind: "struct",
            fields: [
                ["publicKey", crypto_1.PublicKey],
                ["accessKey", transactions_1.AccessKey],
            ],
        },
    ],
    [transactions_1.DeleteKey, { kind: "struct", fields: [["publicKey", crypto_1.PublicKey]] }],
    [transactions_1.DeleteAccount, { kind: "struct", fields: [["beneficiaryId", "string"]] }],
    [
        transactions_1.DelegateAction,
        {
            kind: "struct",
            fields: [
                ["senderId", "string"],
                ["receiverId", "string"],
                ["actions", [transactions_1.Action]],
                ["nonce", "u64"],
                ["maxBlockHeight", "u64"],
                ["publicKey", crypto_1.PublicKey],
            ],
        },
    ],
    [
        transactions_1.SignedDelegate,
        {
            kind: "struct",
            fields: [
                ["delegateAction", transactions_1.DelegateAction],
                ["signature", transactions_1.Signature],
            ],
        },
    ],
]);
//# sourceMappingURL=TransactionSchemaV2.js.map