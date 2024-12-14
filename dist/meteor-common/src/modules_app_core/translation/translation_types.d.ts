import { ReactElement } from "react";
import { ETransactionType } from "../../modules_feature/transactions/transaction_utils";
import { ENearNetwork } from "../../modules_external/near/types/near_basic_types";
import { ETransactionBadgeStatus } from "@meteorwallet/app/src/services/transactions";
import { ENftOfferDir } from "@meteorwallet/app/src/components/sectionComponents/transaction_components/action_components/ui_components/Component_NftTradeUI";
import { ENearIndexer_AccessKeyPermission, ENearIndexer_ActionType } from "../../modules_external/near_public_indexer/types/near_indexer_basic_types";
import { EChallengeStatus } from "../../modules_feature/missions/mission_types";
type TBasicTrans = ReactElement | string;
export interface ITranslations {
    languageDisplayName: string;
    languageCode: string;
    services: {
        near: {
            networkNames: {
                [key in ENearNetwork]: string;
            };
            networkNamesShort: {
                [key in ENearNetwork]: string;
            };
        };
        refresh: {
            refreshText: string;
            updatingText: string;
        };
        copy: {
            common: string;
            wallet: string;
            copy_id: string;
        };
        delete: {
            common: string;
            delete: string;
            cancel: string;
            delete_this_account: string;
            delete_this_account_note: string;
        };
        fund: {
            almost_there: string;
            check_now: string;
            checking: string;
            send_at_least: string;
            fund_via_testnet: string;
            checking_again_in: string;
            error_occurred: string;
        };
        user: {
            needLogin: string;
        };
    };
    buttonText: {
        createNewAccount: TBasicTrans;
        importAccount: TBasicTrans;
        updateText: string;
        continueText: string;
        confirmText: string;
        createWallet: string;
    };
    sidebarUi: {
        button_addWallet: string;
        button_settings: string;
        button_signOut: string;
        noWalletBlurb: string;
        notSignedInBlurb: string;
    };
    mainUi: {
        menu_button_wallets: string;
        heading_myAssets: string;
        button_deposit: string;
        button_send: string;
        button_stake: string;
        button_swap: string;
        updating: string;
    };
    common: {
        errors: {
            title_unknown_error: string;
            desc_unknown_error: string;
        };
        maintenance: {
            title_maintenance: string;
            desc_maintenance: string;
        };
    };
    pageContent: {
        walletDeposit: {
            heading_deposit: string;
            text_copy_wallet: string;
        };
        linkdrop: {
            title_incorrect_link_format: string;
            description_incorrect_link_format: string;
            title_drop_claimed: string;
            description_drop_claimed: string;
            title_received_drop: string;
            description_received_drop: string;
            claim: string;
            claim_with_following_account: string;
            claim_with_new_account: string;
            claim_success_title: string;
            claim_success_description: string;
            claim_success_with_redirect_description: string;
            something_went_wrong_title: string;
            something_went_wrong_description: string;
            or: string;
        };
        linkdropClaimedSuccess: {
            title: string;
            subtitle: string;
            button_redirect: string;
        };
        topup: {
            heading_get_near: string;
            buy_near: string;
            onramper_description: string;
            bridge_from_eth_aurora: string;
            rainbow_bridge_description: string;
            supported_cex: string;
            okx_description: string;
            binance_description: string;
            huobi_description: string;
            kraken_description: string;
        };
        addressBook: {
            text_noAddressesFound: string;
            heading_otherOwnedAccounts: string;
            heading_savedAccounts: string;
            heading_recentlyUsedAccounts: string;
        };
        importWallet: {
            heading_passwordSection: string;
            blurb_passwordSection: string;
            heading_inputPhraseSection: string;
            blurb_inputPhraseSection: string;
            heading_chooseInputType: string;
            heading_inputPrivateKeySection: string;
            blurb_inputPrivateKeySection: string;
            heading_confirmAccount: string;
            blurb_confirmAccount: string;
            toast_title_noAccountFound: string;
            toast_text_noAccountFound: string;
            toast_title_unknownError: string;
            toast_text_unknownError: string;
            a_12_word_secret: string;
            secret_phrase: string;
            private_key: string;
            private_key_desc: string;
            words_12: string;
            private_crypto_key: string;
            find_my_account: string;
            account: string;
            already_imported: string;
        };
        appSettings: {
            heading_settings: string;
            button_language: string;
            button_addressBook: string;
            button_subtext_addressBook: string;
            button_autoLockTimer: string;
            button_subtext_autoLockTimer: string;
            button_changePassword: string;
            button_subtext_changePassword: string;
            button_meteorCommunity: string;
            button_subtext_meteorCommunity: string;
            button_giveFeedback: string;
            button_subtext_giveFeedback: string;
            button_aboutMeteor: string;
            button_subtext_aboutMeteor: string;
            sectionConnectedApp: {
                text_deauthorize: string;
                text_feeAllowance: string;
                text_allowedMethod: string;
                text_any: string;
            };
            sectionDeleteAccount: {
                text_warning: string;
                text_delete_password: string;
                text_action_desc: string;
                text_remove_account: string;
            };
            sectionProfile: {
                update_profile_warning: string;
                update_pfp_warning: string;
                pfp_updated: string;
                profile_updated: string;
                name: string;
                about: string;
                update: string;
                set_pfp: string;
                pfp_tooltip: string;
                sync_near_social: string;
                sync_near_social_header: string;
                sync_near_social_desc: string;
                sync_now: string;
                account_synced: string;
                follower: string;
            };
            sectionChangePassword: {
                text_password_changed_success: string;
                text_change_password_warning: string;
                text_finish: string;
                text_change_password: string;
                text_create_password: string;
            };
            sectionAccessKey: {
                text_add_key: string;
                text_edit_label: string;
                text_revoke_access: string;
                text_revoke_access_key: string;
                text_remove_key_desc: string;
                text_cancel: string;
                text_remove_key: string;
                text_primary_key: string;
                text_public_key: string;
                text_known_data: string;
                text_private_key: string;
                text_secret_phrase: string;
                text_unknown_to_meteor: string;
                text_access_key_warning_msg: string;
                text_access_key: string;
                text_add_key_subtitle: string;
                text_access_key_label: string;
                text_generate_new_key: string;
                text_generate_new_key_desc: string;
                text_clear_label: string;
            };
            sectionCommunity: {
                text_communityBlurb: string;
                text_thank_you: string;
                text_follow_twitter: string;
                text_report_bug: string;
                text_join_discord: string;
            };
        };
        explore: {
            text_explore: string;
            text_challenges: string;
            text_missions: string;
            text_rewards: string;
            trending_projects: string;
            defi: string;
            nfts: string;
            near_ecosystem: string;
            hide: string;
            show: string;
            tonic_desc: string;
            spin_desc: string;
            burrow_desc: string;
            perk_desc: string;
            pembrock_desc: string;
            meta_yield_desc: string;
            paras_desc: string;
            tradeport_desc: string;
            antisocial_desc: string;
            near_social_desc: string;
            near_crash_desc: string;
            challenge: {
                btn_view_details: string;
                btn_view_winners: string;
                btn_accept_challenge: string;
                btn_challenge_accepted: string;
                status: {
                    [key in EChallengeStatus]: string;
                };
            };
            mission: {
                label_my_profile: string;
                label_level: string;
                label_points_earned: string;
                label_global_ranking: string;
                text_mission_unlock: string;
                label_daily_tasks: string;
                label_daily_task: string;
                label_points_reward: string;
                label_earn_more_side_quest: string;
                label_completed: string;
                label_earned: string;
                button_start_now: string;
                button_completed: string;
                user_consent: {
                    label_title: string;
                    label_description: string;
                    button_accept: string;
                    text_note: string;
                };
                no_daily_task: string;
                no_side_quest: string;
                toast_mission_sign_up_success: string;
            };
            reward: {
                label_collected_points: string;
                label_redeem: string;
                label_redeem_history: string;
                label_claim_reward: string;
                label_left: string;
                button_redeem: string;
                button_harvest: string;
                button_claim: string;
                code_required_to_claim: string;
                placeholder_for_redeem_code: string;
                no_redeem_title: string;
                no_redeem_description: string;
                no_claim_reward_title: string;
                no_claim_reward_description: string;
            };
        };
        walletSwap: {
            swap: string;
            confirm_swap: string;
            something_wrong: string;
            failed_build_transaction: string;
            preparing_transaction: string;
            getting_transaction_ready: string;
            executing_step: string;
            calling: string;
            you_receive: string;
            you_pay: string;
            swap_successful: string;
            swap_success_desc: string;
            swap_failed: string;
            swap_failed_desc: string;
            close: string;
            review_swap: string;
            route_not_found: string;
            inadequate_balance: string;
            show_all_routes: string;
            to_contract: string;
            do_no_close_page: string;
            provider: string;
            price_impact: string;
            network_fee: string;
            swap_fee: string;
            route: string;
            minimum_received: string;
            best_route: string;
            find_token_hint: string;
        };
        walletStake: {
            liquid_staking: string;
            standard_staking: string;
            liquid_staking_desc: string;
            standard_staking_desc: string;
            create_new_staking: string;
            create_new_staking_desc: string;
            my_staked_validators: string;
            display_newly_staked_note: string;
            search_validator: string;
            load_more: string;
            something_wrong: string;
            staking_failed: string;
            staking_failed_went_wrong: string;
            unstake_failed: string;
            unstake_failed_went_wrong: string;
            staked_success: string;
            staked_success_msg: string;
            unstaked_success: string;
            unstaked_success_msg: string;
            review_staking: string;
            review_unstaking: string;
            you_stake: string;
            you_unstake: string;
            you_receive: string;
            validator_details: string;
            confirm: string;
            staking: string;
            close: string;
            stake: string;
            unstake: string;
            to: string;
            from: string;
            create_liquid_staking: string;
            liquid_unstake: string;
            inadequate_balance: string;
            minimum_liquid_note: string;
            staking_details: string;
            you_are_staking: string;
            staking_with: string;
            days: string;
            estimated_earnings: string;
            select_your_validator_pool: string;
            select_validator: string;
            Insufficient_balance: string;
            use_max: string;
            available: string;
            create_standard_staking: string;
            amount_to_unstake_in: string;
            active: string;
            reward_token_s: string;
            inactive: string;
            total_staked: string;
            estimated_apy: string;
            staked_near: string;
            staked_near_tooltip: string;
            unclaimed_reward: string;
            unclaimed_reward_tooltip: string;
            you_unstaking: string;
            usually_take_72_hour_unstake: string;
            unstaked_ready_to_claimed: string;
            claim_unstaked: string;
            stake_more: string;
            claim_reward: string;
            provider: string;
            liquid_unstake_fee: string;
            unlock_period: string;
            total_near_staked: string;
            balance: string;
            value_in_near: string;
            and_it_usually_takes: string;
            to_unstake: string;
            delayed_unstake: string;
        };
        walletSend: {
            heading_send: string;
            button_useMax: string;
            tooltip_addressBook: string;
            use_max: string;
            available: string;
            no_account_provide: string;
            account_id_note_1: string;
            account_id_note_2: string;
            error_invalid_account: string;
            error_empty_amount: string;
            warning_address_non_standard: string;
            sending_bridged_token_alert: string;
            account_no_exists_warning: string;
            named_account_no_exists_warning: string;
            account_no_exists_warning_deposit: string;
            sending: string;
            to: string;
            account_exists: string;
            send: string;
            confirm_send: string;
            finish: string;
            txID: string;
            sendFtSuccess: string;
            sendSuccess: string;
            mode_not_support: string;
            input_heading_selectAsset: string;
            input_heading_sendTo: string;
            input_placeHolder_sendTo: string;
            input_error_ft: string;
            text_accountIdInfo: string;
            receiver_balance: string;
            receiver_balance_fail: string;
            address_display_is_own_warning: string;
        };
        signTx: {
            potentially_do_some_kind_of_action: string;
            does_not_execute_on_blockchain: string;
            receiving_from_dapp: string;
            couldnt_parse_arg_login: string;
            couldnt_parse_arg_logout: string;
            connect_request: string;
            connect_with_acc: string;
            this_app_would_like_to: string;
            know_your_add: string;
            know_your_balance: string;
            network_fee_placeholder: string;
            network_fee_allowance: string;
            something_went_wrong: string;
            create_import_wallet: string;
            contract: string;
            connect: string;
            cancel: string;
            request_logout_could_not_found: string;
            request_logout_sign_out_anyway: string;
            sign_out_request: string;
            sign_out_desc: string;
            wallet: string;
            logout: string;
            couldnt_parse_arg_verify: string;
            request_authentication_not_found: string;
            verification_request: string;
            verification_request_desc: string;
            sign_message_request_title: string;
            sign_message_request_desc: string;
            sign_message_request_submit_text: string;
            sign_message_with_account: string;
            message_to_be_signed: string;
            view_full_message: string;
            close_sign_message_full_details: string;
            verify_account: string;
            select_account: string;
            know_your_chosen_wallet_add: string;
            verify_own_wallet_add: string;
            does_not_allow: string;
            calling_method_on_behalf: string;
            verify: string;
            estimated_changes: string;
            send: string;
            you_sending_asset: string;
            you_sending_assets: string;
            couldnt_parse_arg_tx: string;
            approve_transactions: string;
            approve_transaction: string;
            transaction: string;
            approve: string;
            close_details: string;
            view_transaction_details: string;
            transaction_details: string;
            fees_tooltips: string;
            fees: string;
            with_deposit: string;
            from: string;
            to: string;
        };
        walletHome: {
            subtext_availableFunds: string;
            tooltip_availableFunds: string;
            warning_needsRecoveryBackup: string;
            warning_needsRecoveryBackup_desc: string;
            warning_needsRecoveryBackup_btn: string;
            warning_insecureWallet: string;
            warning_insecureWallet_desc: string;
            warning_insecureWallet_btn: string;
            warning_scamTokenCount: string;
            warning_scamTokenCount_multi: string;
        };
        walletConnect: {
            blurb_noAccountFound: string;
        };
        wallet: {
            heading_walletLocked: string;
            blurb_walletLocked: string;
            button_unlockWallet: string;
            toast_heading_passwordIncorrect: string;
            toast_text_passwordIncorrect: string;
            settings: {
                heading_settings: string;
                input_heading_extractSecret: string;
                input_text_extractSecret: string;
                input_heading_exportPrivateKey: string;
                input_text_exportPrivateKey: string;
                input_heading_managePrivateKeys: string;
                input_text_managePrivateKeys: string;
                input_heading_walletLabel: string;
                input_text_walletLabel: string;
                menu_heading_profile: string;
                menu_text_profile: string;
                menu_heading_connectedApps: string;
                menu_text_connectedApps: string;
                menu_heading_securityAndRecovery: string;
                menu_text_securityAndRecovery: string;
                menu_heading_changePassword: string;
                menu_heading_RemoveWalletAccount: string;
                menu_text_removeWalletAccount: string;
                menu_text_changePassword: string;
                common: {
                    enterPasswordBlurb: string;
                    account_not_created_secret_note_1: string;
                    account_not_created_secret_note_2: string;
                    account_not_created_secret_note_3: string;
                    enterPasswordCreateWalletBlurb: string;
                };
                exportPrivateKey: {
                    text_subheadingWarning: string;
                    text_copiedToClipboard: string;
                };
                manageAccessKeys: {
                    input_text_accessKeyLabel: string;
                    button_updateLabel: string;
                };
            };
        };
        signIn: {
            blurb: string;
            welcome: string;
            input_header_password: string;
            button_unlock: string;
            text_forgot_password: string;
            toast_heading_passwordIncorrect: string;
            toast_text_passwordIncorrect: string;
        };
        addWallet: {
            heading_meteorWallet: string;
            blurb: string;
            button_create_new_wallet: string;
            button_subtext_create_new_wallet: string;
            button_import_wallet: string;
            button_subtext_import_wallet: string;
            text_named_wallet: string;
            text_named_wallet_desc: string;
            text_unavailable: string;
        };
        createNewWallet: {
            heading_newWallet: string;
            heading_newWalletChoice: string;
            p4_please_try_again: string;
            p4_unforunately_something_went_wrong: string;
            please_insert_password: string;
            subheading_newWalletChoice: string;
            requires_initial_balance: string;
            random_64_character: string;
            next: string;
            traditional_crypto_wallet: string;
            new_wallet: string;
            available_near: string;
            available_fund: string;
            initial_wallet_balance: string;
            initial_wallet_balance_named_wallet: string;
            select_funding_wallet: string;
            no_account_selected: string;
            account_not_exist: string;
            not_enough_funds: string;
            initial_funding_amount: string;
            account_identity: string;
            account_identity_desc: string;
            is_available: string;
            username_is_available: string;
            account_already_exists: string;
            account_not_compatible: string;
            account_can_contain: string;
            lowercase_characters: string;
            digits: string;
            character_requirement: string;
            account_cannot_contain: string;
            character_dot: string;
            more_than_64_characters: string;
            fewer_than_2_characters: string;
            explore_web3: string;
            step_into_future: string;
            generateNew: string;
            claimIdentity: string;
        };
        createNewWalletV2: {
            heading_title: string;
            heading_subtitle: string;
        };
        extensionConnect: {
            title_extensionInstalled: string;
            blurb_extensionInstalled: string;
            button_text_continueToApp: string;
        };
        gettingStarted: {
            blurb: string;
            welcomeToMeteor: string;
            button_getStarted: string;
        };
        createPassword: {
            agreeToTerms: (link: string) => ReactElement;
            buttons: {
                continue: string;
            };
            heading: string;
            blurb: string;
            placeholders: {
                enterPassword: string;
                confirmPassword: string;
            };
            validation: {
                atLeast8: string;
                doNotMatch: string;
                strengthTooWeak: string;
                strengthWeak: string;
                strengthMedium: string;
                strengthStrong: string;
            };
        };
        recoveryPhrase: {
            toasts: {
                copiedToClipboard: string;
            };
            buttons: {
                continue: string;
                generateNew: string;
                copy: string;
            };
            confirmSavedPhrase: string;
            blurb: string;
            heading: string;
        };
        seedPhraseConfirmation: {
            buttons: {
                confirm: string;
                back: string;
            };
            wordForFirst: string;
            wordForLast: string;
            confirmationWrongHeading: string;
            confirmationWrongBlurb: string;
            profilePasswordMismatchHeading: string;
            profilePasswordMismatchBlurb: string;
            heading: string;
            blurb: string;
        };
        accountSuccess: {
            heading: string;
            blurb: string;
            followUsOnTwitter: string;
            joinDiscord: string;
            button_finish: string;
            button_redirect: string;
            toast_title: string;
        };
        transactions: {
            heading_history: string;
            typeName: {
                [key in ETransactionType]: string;
            };
            badgeStatus: {
                [key in ETransactionBadgeStatus]: string;
            };
            actionTitle: {
                [key in ENearIndexer_ActionType]: string;
            };
            common: {
                call: string;
                status: {
                    success: string;
                    failed: string;
                    unknown: string;
                };
            };
            loadingBottom: {
                more: string;
                loading: string;
                end: string;
            };
            direction: {
                from: string;
                to: string;
                with: string;
            };
            accessKey: {
                addKey: string;
                deleteKey: string;
                key: string;
                permissionTypes: {
                    [key in ENearIndexer_AccessKeyPermission]: string;
                };
                publicKey: string;
                receiverId: string;
                allowMethodNames: string;
                emptyMethodNames: string;
                allowance: string;
            };
            account: {
                createTitle: string;
                createdMessage: string;
                deletedMessage: string;
                publicKey: string;
                deposit: string;
                byId: string;
                beneficiaryId: string;
            };
            deploy: {
                code: string;
                message: string;
            };
            functionCall: {
                brief: string;
                details: string;
                cost: string;
                deposit: string;
                args: string;
            };
            details: {
                transactionHash: string;
                includedInBlockHash: string;
                includedInChunkHash: string;
                blockTimestamp: string;
                signerAccountId: string;
                signerPublicKey: string;
                receiverAccountId: string;
                convertedIntoReceiptId: string;
                receiptConversionBurnt: string;
                moreInformation: string;
                lessInformation: string;
                action: string;
                viewExplorer: string;
            };
            custom: {
                ftSwap: {
                    title: string;
                    near: string;
                };
                nftTrade: {
                    direction: {
                        [key in ENftOfferDir]: string;
                    };
                };
            };
        };
        nftCollection: {
            heading_nft: string;
            nothing: string;
            total_nfts: string;
            total_floor_price: string;
            total_floor: string;
            floor_price: string;
            contract: string;
        };
        nftDetails: {
            button_send: string;
            button_explorer: string;
            button_view: string;
            heading_description: string;
            heading_properties: string;
        };
        voterModal: {
            title: string;
            description: string;
            description2: string;
            button_confirm: string;
            button_cancel: string;
            checkbox_dont_show: string;
        };
    };
}
export declare enum ELanguage {
    en = "en",
    fr = "fr",
    id = "id",
    vi = "vi",
    zh = "zh"
}
export {};
