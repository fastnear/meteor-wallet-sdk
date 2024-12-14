import { transactions, utils } from "near-api-js";
import BN from "bn.js";
import { ENearIndexer_ActionKind, INearIndexer_Transaction_WithActions } from "../../modules_external/near_public_indexer/types/near_indexer_transaction_types";
import { Action } from "@near-wallet-selector/core";
export declare enum ETransactionType {
    receive = "receive",
    send = "send",
    self = "self",
    unknown = "unknown"
}
export declare const getTrxType: (trx: INearIndexer_Transaction_WithActions, accountId: string) => ETransactionType;
export declare const isSingleActionTrx: (trx: INearIndexer_Transaction_WithActions) => boolean;
declare function tryParseArgsBase64Json(rawArgBase64: string | Array<number> | Uint8Array): any | undefined;
declare function tryAddParseActionArgsJsonForTrx(trxs: INearIndexer_Transaction_WithActions | INearIndexer_Transaction_WithActions[]): INearIndexer_Transaction_WithActions[];
export declare const transaction_utils: {
    deserializeTransactionsFromString: (transactionsString: any) => any;
    parseNearApiTrxActionToIndexType: (action: transactions.Action) => {
        action_kind: ENearIndexer_ActionKind.FUNCTION_CALL;
        args: {
            gas: string;
            method_name: string;
            deposit: string;
            args_base64: string;
            args_json: any;
            args_str: any;
        };
    } | {
        action_kind?: undefined;
        args?: undefined;
    };
    parseNearApiTrxToIndexType: (trx: transactions.Transaction) => {
        actions: ({
            action_kind: ENearIndexer_ActionKind.FUNCTION_CALL;
            args: {
                gas: string;
                method_name: string;
                deposit: string;
                args_base64: string;
                args_json: any;
                args_str: any;
            };
        } | {
            action_kind?: undefined;
            args?: undefined;
        })[];
        signer_public_key: utils.key_pair.PublicKey;
        signer_account_id: string;
        receiver_account_id: string;
        nonce: BN;
    };
    calcTotalTokenInTransactions: (trxs: transactions.Transaction[]) => {
        ftTokens: {
            [tokenName: string]: BN;
        };
        totalTokens: {
            type: "ft" | "nft";
            contractName: string;
            amount?: BN | undefined;
            tokenId?: string | undefined;
        }[];
    };
    tryAddParseActionArgsJsonForTrx: typeof tryAddParseActionArgsJsonForTrx;
    tryParseArgsBase64Json: typeof tryParseArgsBase64Json;
    createAction: (action: Action) => transactions.Action;
};
export {};
