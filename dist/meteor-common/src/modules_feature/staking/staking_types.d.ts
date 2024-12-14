import type { EpochValidatorInfo } from "near-api-js/lib/providers/provider";
import { IWithAccountIdAndNetwork, IWithValidatorId } from "../../modules_external/near/types/near_input_helper_types";
import { IMeteorFungibleTokenMetadata, IMeteorFungibleTokenWithPrice, TTokenPriceList } from "../fungible_tokens/fungible_tokens_types";
/*******************************/
/*******************************/
export interface IValidatorDetails {
    validatorId: string;
    fee: number;
    isActive: boolean;
    stakedNearAmount: string;
    stakingType: EStakingType;
    pendingUnstakePeriod: string;
    validatorVersion: EValidatorVersion;
    rewardTokens: TTokenApy[];
    apy: number;
    farms?: TValidatorFarm[];
    liquidUnstakeFee?: number;
    tokenToReceive?: IMeteorFungibleTokenWithPrice;
}
export type TFeeFraction = {
    numerator: number;
    denominator: number;
};
export type TStakedValidator = {
    deposit: string;
    totalBalance?: string;
    stakedBalance?: string;
    unstakedBalance?: string;
    unstakedStatus?: boolean;
    earning?: string;
    unclaimedTokenRewards?: TUnclaimedTokenReward[];
} & IValidatorDetails;
export type TValidatorDetails = IValidatorDetails;
export type TUnclaimedTokenReward = {
    reward: string;
} & IMeteorFungibleTokenMetadata;
export type TTokenApy = {
    apy: number;
} & IMeteorFungibleTokenWithPrice;
export type TStakingRewardEstimation = {
    usdAmount: number;
    tokenAmount: number;
    periodInDay: number;
} & TTokenApy;
export type TCurrentEpochValidatorsInfo = {
    account_id: string;
    public_key: string;
    is_slashed: boolean;
    stake: string;
    shards: number[];
    num_produced_blocks: number;
    num_expected_blocks: number;
};
export type TValidatorFarm = {
    farm_id: number;
    name: string;
    token_id: string;
    amount: string;
    start_date: string;
    end_date: string;
    active: boolean;
};
/*******************************/
/*******************************/
export declare enum EStakingType {
    normal = "normal",
    liquid = "liquid"
}
export declare enum EValidatorVersion {
    normal = "normal",
    farming = "farming"
}
export declare enum EStakingView {
    STAKE_VIEW_METHOD = "stake_view_method",
    STAKE_VIEW_LIST = "stake_view_list",
    STAKE_VIEW_STAKE = "stake_view_stake",
    STAKE_VIEW_LIQUID_STAKE = "stake_view_liquid_stake",
    STAKE_VIEW_CONFIRM_STAKING = "stake_view_confirm_staking",
    STAKE_VIEW_LIQUID_UNSTAKE = "stake_view_liquid_unstake",
    STAKE_VIEW_CONFIRM_UNSTAKING = "stake_view_confirm_unstaking",
    STAKE_VIEW_SELECT_PROVIDER = "stake_view_select_provider"
}
/*******************************/
/*******************************/
export type TIOGetValidatorFee_Input = {
    validatorId: string;
} & IWithAccountIdAndNetwork;
export type TIOGetValidatorDetails_Input = IWithAccountIdAndNetwork & IWithValidatorId & {
    tokenPriceList?: TTokenPriceList;
    current_validators?: TCurrentEpochValidatorsInfo[];
};
export type TIOGetValidatorDetails_Output = TValidatorDetails;
export type TIOGetValidatorsListAndDetails_Input = IWithAccountIdAndNetwork;
export type TIOGetValidatorsListAndDetails_Output = TValidatorDetails[];
export type TIOGetUserStakedValidators_Input = IWithAccountIdAndNetwork;
export type TIOGetUserStakedValidators_Output = TStakedValidator[];
export type TIOGetStakedDetails_Input = {
    validatorId: string;
} & IWithAccountIdAndNetwork;
export type TIODepositAndStakeNear_Input = {
    validatorId: string;
    nearAmount: number;
} & IWithAccountIdAndNetwork;
export type TIOGetValidatorsStatus_Output = EpochValidatorInfo;
export type TIOGetContractCodeHash_Output = {
    block_hash: string;
    block_height: number;
    code_base64: string;
    hash: string;
};
export type TIOGetPoolSummary_Input = {
    validatorId: string;
} & IWithAccountIdAndNetwork;
export type TIOGetPoolSummary_Output = {
    owner: string;
    total_staked_balance: number;
    reward_fee_fraction: TFeeFraction;
    next_reward_fee_fraction: TFeeFraction;
    burn_fee_fraction: TFeeFraction;
    farms: Array<TValidatorFarm>;
};
export type TIOWithdrawAll_Input = TIOGetPoolSummary_Input;
