export declare const StringRegex: {
    digitsRegex: RegExp;
};
export declare const notNullEmpty: (str: string | null | undefined) => str is string;
export declare const nullEmpty: (str: string | null | undefined) => str is "" | null | undefined;
export declare const firstNotNullEmpty: (...strItems: (string | null | undefined)[]) => string | undefined;
export declare const safeAppend: (str: string | null | undefined, value: string, ifEmptyValue?: string | null) => string;
export declare class BetterStringArray extends Array<string> {
    pushIfNotNullEmpty(str: string): void;
}
export declare function createPadder(padCharacter: string, desiredTotalLength: number, padFromRight?: boolean): (input: string | number) => string;
export declare function pad(input: string | number, padCharacter: string, desiredTotalLength: number, padFromRight?: boolean): string;
export interface IConvertToSlugOptions {
    slugDivider?: string;
    normalize?: boolean;
    letterCase?: "UPPER" | "LOWER" | "UNAFFECTED";
    excludeCharacters?: string[];
}
export declare const convertToSlug: (text: string, { slugDivider, letterCase, normalize, excludeCharacters, }?: IConvertToSlugOptions) => string;
export declare const stringToConstantStyledString: (input: string) => string;
declare function isUriEncoded(uri: string): boolean;
interface IRemoveAndTrimInput {
    spaceAware?: boolean;
    insideWords?: boolean;
}
declare function sortCompareStrings(a: string, b: string): number;
declare function comparePure(a: string, b: string): 1 | 0 | -1;
declare function onlyNotNullEmpty(strArray: (string | null | undefined)[]): string[];
export declare const StringUtils: {
    isUriEncoded: typeof isUriEncoded;
    decodeUriFully: (uri: string) => string;
    StringRegex: {
        digitsRegex: RegExp;
    };
    reverse: (input: string) => string;
    notNullEmpty: (str: string | null | undefined) => str is string;
    nullEmpty: (str: string | null | undefined) => str is "" | null | undefined;
    anyNullEmpty: (strs: Array<string | null | undefined>) => boolean;
    safeAppend: (str: string | null | undefined, value: string, ifEmptyValue?: string | null) => string;
    createPadder: typeof createPadder;
    pad: typeof pad;
    convertToSlug: (text: string, { slugDivider, letterCase, normalize, excludeCharacters, }?: IConvertToSlugOptions) => string;
    stringToConstantStyledString: (input: string) => string;
    removeAndTrim: (input: string, removeText: string[], { spaceAware, insideWords }?: IRemoveAndTrimInput) => string;
    sortCompareStrings: typeof sortCompareStrings;
    comparePure: typeof comparePure;
    onlyNotNullEmpty: typeof onlyNotNullEmpty;
    firstNotNullEmpty: (...strItems: (string | null | undefined)[]) => string | undefined;
    joinIntoUrl: (...routes: (string | undefined)[]) => string;
    getUrlWithBaseUrl: (baseUrl: string, route: string) => string;
    isHashId: (accountId: string) => boolean;
};
export {};
