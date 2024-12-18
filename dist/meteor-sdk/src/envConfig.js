"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setEnvConfig = exports.envConfig = void 0;
const MeteorWalletConstants_1 = require("./MeteorWalletConstants");
const locallySetBaseUrl = typeof window !== "undefined"
    ? window.localStorage.getItem("DEV__METEOR_WALLET_BASE_URL")
    : undefined;
exports.envConfig = {
    wallet_base_url: locallySetBaseUrl ?? MeteorWalletConstants_1.WALLET_URL_PRODUCTION_BASE,
};
// console.log("Initialized environment", envConfig);
function setEnvConfig(config) {
    Object.assign(exports.envConfig, config);
}
exports.setEnvConfig = setEnvConfig;
//# sourceMappingURL=envConfig.js.map