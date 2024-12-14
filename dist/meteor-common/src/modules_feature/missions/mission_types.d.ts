import type { Challenge, ChallengeWinner, ENearNetwork, WalletsChallenges } from "@prisma/client";
import { EMeteorAnalytics_AppReleaseEnvironment } from "../../modules_utility/analytics/meteor_analytics_enums";
import { EFeatureEnrollmentRecord_ConsentStatus } from "./feature_enrollment_records/feature_enrollment_records.enum";
export type TChallengeWithWalletsChallenges = Challenge & {
    walletsChallenges: WalletsChallenges[];
    challengeWinners: ChallengeWinner[];
};
export declare enum EChallengeStatus {
    COMING_SOON = 0,
    ACTIVE = 1,
    WINNERS_TO_BE_ANNOUNCED = 2,
    ENDED_WITH_WINNERS = 3,
    ENDED_WITHOUT_WINNERS = 4
}
export declare const EChallengeStatusColor: {
    0: string;
    1: string;
    2: string;
    3: string;
    4: string;
};
export interface IMissionAnalyticsResponse {
    status: number;
    message: string;
    data: {
        id: number;
        session_id: string;
        blockchain: string;
        network: ENearNetwork;
        sub_event_type_id: "button_clicked";
        app_anon_id: string;
        app_driver: string;
        app_version: string;
        app_release: EMeteorAnalytics_AppReleaseEnvironment;
        wallet_id: string;
        url: null | string;
        button_id: string;
        contract_id: null;
        external_host: null;
        allow_method: null;
        allow_type: null;
        method_name: null;
        params: null;
        trx_hash: null;
        sent_token_contract_id: null;
        sent_token_symbol: null;
        sent_token_human_readable_amount: null;
        sent_token_usd_amount: null;
        error_message: null;
    };
}
interface IEventQuestTokenSendPayload {
    sent_token_symbol: string;
    sent_token_contract_id: string;
    sent_token_human_readable_amount: number;
    sent_token_usd_amount: number;
    trx_hash: string;
}
export interface IEventQuestPayload extends Partial<IEventQuestTokenSendPayload> {
    app_anon_id: string;
    app_driver: string;
    app_version: string;
    app_release: EMeteorAnalytics_AppReleaseEnvironment;
    eventType?: "wallet_action";
    sub_event_type_id: "page_view";
    blockchain: string;
    network: ENearNetwork;
    wallet_id: string;
    button_id?: string;
}
export interface ICheckMissionFeatureEnrollment {
    blockchain_id: string;
    network_id: string;
    wallet_id: string;
    feature_id: string;
}
export interface ISetMeteorMissionFeatureEnrollment {
    data: {
        public_key: string;
        consent_status: EFeatureEnrollmentRecord_ConsentStatus.accepted | EFeatureEnrollmentRecord_ConsentStatus.denied;
    };
    network: ENearNetwork;
}
export {};
