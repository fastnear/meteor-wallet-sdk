"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EChallengeStatusColor = exports.EChallengeStatus = void 0;
var EChallengeStatus;
(function (EChallengeStatus) {
    EChallengeStatus[EChallengeStatus["COMING_SOON"] = 0] = "COMING_SOON";
    EChallengeStatus[EChallengeStatus["ACTIVE"] = 1] = "ACTIVE";
    EChallengeStatus[EChallengeStatus["WINNERS_TO_BE_ANNOUNCED"] = 2] = "WINNERS_TO_BE_ANNOUNCED";
    EChallengeStatus[EChallengeStatus["ENDED_WITH_WINNERS"] = 3] = "ENDED_WITH_WINNERS";
    EChallengeStatus[EChallengeStatus["ENDED_WITHOUT_WINNERS"] = 4] = "ENDED_WITHOUT_WINNERS";
})(EChallengeStatus = exports.EChallengeStatus || (exports.EChallengeStatus = {}));
exports.EChallengeStatusColor = {
    [EChallengeStatus.COMING_SOON]: "blue",
    [EChallengeStatus.ACTIVE]: "green",
    [EChallengeStatus.WINNERS_TO_BE_ANNOUNCED]: "gray",
    [EChallengeStatus.ENDED_WITH_WINNERS]: "gray",
    [EChallengeStatus.ENDED_WITHOUT_WINNERS]: "gray",
};
//# sourceMappingURL=mission_types.js.map