import Big from "big.js";
import { Account } from "near-api-js";
import { IWithAccountIdAndNetwork, IWithContractName, IWithValidatorId } from "../../modules_external/near/types/near_input_helper_types";
import { INearFungibleTokenMetadata } from "../../modules_external/near/types/standards/fungible_token_standard_types";
/*******************************/
/*******************************/
export type TTokenPrice = {
    decimal: number;
    price: string;
    symbol: string;
};
export type TTokenPriceWithAddress = {
    decimal: number;
    price: string;
    symbol: string;
    address: string;
};
export type TTokenPriceList = {
    "wrap.near": TTokenPrice;
    [tokenId: string]: TTokenPrice;
};
export declare enum MeteorFungibleTokenType {
    bridged = "bridged",
    native = "native"
}
export interface IMeteorFungibleToken {
    address: string;
    symbol: string;
    type: MeteorFungibleTokenType;
}
export interface IMeteorFungibleTokenMetadata extends INearFungibleTokenMetadata {
    id: string;
    icon: string;
}
export interface IMeteorFungibleTokenWithPrice extends IMeteorFungibleTokenMetadata {
    price_in_usd: number;
}
export interface IMeteorFungibleTokenWithPriceAndAmount extends IMeteorFungibleTokenWithPrice {
    amountFormatted: string;
    amountRaw?: Big;
}
/*******************************/
/*******************************/
export type TIOGetFungibleTokenMetadata_Input = {
    contractId: string;
} & IWithAccountIdAndNetwork;
export interface ITransferStorageDeposit_Input extends IWithContractName {
    account: Account;
    receiverId: string;
    storageDepositAmount: string;
}
export interface IClaimFarmRewardsInput extends IWithValidatorId, IWithAccountIdAndNetwork {
    tokenIds: string[];
}
export interface ITokenExchangePrice {
    decimal: number;
    price: string;
    symbol: string;
}
export interface IGetFtExchangePrices_Output {
    token?: ITokenExchangePrice;
}
