"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeteorThemeColors = exports.ThemeStatic = exports.EThemeMode = void 0;
var EThemeMode;
(function (EThemeMode) {
    EThemeMode["dark"] = "dark";
    EThemeMode["light"] = "light";
})(EThemeMode = exports.EThemeMode || (exports.EThemeMode = {}));
exports.ThemeStatic = {
    gradients: {
        button: {
            regular: {
                [EThemeMode.dark]: "orange.300, red.500, pink.500",
                [EThemeMode.light]: "orange.300, red.300, red.400",
            },
            hover: {
                [EThemeMode.dark]: "orange.200, red.400, pink.300",
                [EThemeMode.light]: "orange.300, red.300, pink.200",
            },
        },
    },
};
exports.MeteorThemeColors = {
    primary: ["71, 27, 232", 71, 27, 232],
};
//# sourceMappingURL=ThemeStatic.js.map