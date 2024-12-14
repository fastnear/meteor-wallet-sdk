export declare enum EThemeMode {
    dark = "dark",
    light = "light"
}
interface IThemeStatic {
    gradients: {
        button: {
            regular: {
                [EThemeMode.dark]: string;
                [EThemeMode.light]: string;
            };
            hover: {
                [EThemeMode.dark]: string;
                [EThemeMode.light]: string;
            };
        };
    };
}
export declare const ThemeStatic: IThemeStatic;
type TRgbArray = [string, number, number, number];
export declare const MeteorThemeColors: {
    primary: TRgbArray;
};
export {};
