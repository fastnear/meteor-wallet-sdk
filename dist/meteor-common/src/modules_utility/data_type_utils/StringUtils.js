"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringUtils = exports.stringToConstantStyledString = exports.convertToSlug = exports.pad = exports.createPadder = exports.BetterStringArray = exports.safeAppend = exports.firstNotNullEmpty = exports.nullEmpty = exports.notNullEmpty = exports.StringRegex = void 0;
exports.StringRegex = {
    digitsRegex: /\b\d+\b/gi,
};
const notNullEmpty = (str) => {
    return str != null && str.length > 0;
};
exports.notNullEmpty = notNullEmpty;
const nullEmpty = (str) => {
    return !(0, exports.notNullEmpty)(str);
};
exports.nullEmpty = nullEmpty;
const firstNotNullEmpty = (...strItems) => {
    for (const item of strItems) {
        if ((0, exports.notNullEmpty)(item)) {
            return item;
        }
    }
    return undefined;
};
exports.firstNotNullEmpty = firstNotNullEmpty;
const anyNullEmpty = (strs) => {
    for (const str of strs) {
        if ((0, exports.nullEmpty)(str)) {
            return true;
        }
    }
    return false;
};
const safeAppend = (str, value, ifEmptyValue = null) => {
    return (0, exports.notNullEmpty)(str)
        ? str + value
        : ifEmptyValue != null
            ? ifEmptyValue
            : value;
};
exports.safeAppend = safeAppend;
class BetterStringArray extends Array {
    pushIfNotNullEmpty(str) {
        if ((0, exports.notNullEmpty)(str)) {
            this.push(str);
        }
    }
}
exports.BetterStringArray = BetterStringArray;
function createPadder(padCharacter, desiredTotalLength, padFromRight = false) {
    return (input) => {
        return pad(input, padCharacter, desiredTotalLength, padFromRight);
    };
}
exports.createPadder = createPadder;
function pad(input, padCharacter, desiredTotalLength, padFromRight = false) {
    const difference = desiredTotalLength - `${input}`.length;
    if (difference > 0) {
        const padding = new Array(difference).fill(padCharacter);
        if (padFromRight) {
            return `${input}${padding.join("")}`;
        }
        return `${padding.join("")}${input}`;
    }
    return `${input}`;
}
exports.pad = pad;
const regexAllSpaces = new RegExp("\\s+", "g");
const regexDoubleDashes = new RegExp("--+", "g");
const regexFirstDash = new RegExp("^-+", "g");
const regexLastDash = new RegExp("-+$", "g");
const regexSingleDash = new RegExp("-", "g");
const regexRemoveNonWord = new RegExp("[^\\w\\-]+", "g");
const regexAllUnderscores = new RegExp("_", "g");
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
const convertToSlug = (text, { slugDivider = "-", letterCase = "LOWER", normalize = true, excludeCharacters = [], } = {}) => {
    if (!text || text.length === 0) {
        return "";
    }
    let resp = text.toString();
    if (normalize) {
        resp = resp.normalize("NFD");
    }
    if (letterCase === "LOWER") {
        resp = resp.toLowerCase();
    }
    else if (letterCase === "UPPER") {
        resp = resp.toUpperCase();
    }
    return resp
        .replace(regexAllSpaces, "-") // Replace spaces with -
        .replace(excludeCharacters.length > 0
        ? new RegExp(`[^\\w\\-${excludeCharacters
            .map((c) => escapeRegExp(c))
            .join("")}]+`, "g")
        : regexRemoveNonWord, "") // Remove all non-word chars
        .replace(excludeCharacters.includes("_") ? regexAllSpaces : regexAllUnderscores, "-") // replace underscores with dashes
        .replace(regexDoubleDashes, "-") // Replace multiple - with single -
        .replace(regexFirstDash, "") // Trim - from start of text
        .replace(regexLastDash, "") // Trim - from end of text
        .replace(regexSingleDash, slugDivider); // Replace all - with whatever the slug divider is
    /*return resp
      .replace(/\s+/g, "-") // Replace spaces with -
      // .replace(/[^\w\-]+/g, "") // Remove all non-word chars
      .replace(/[^\w\-]+/g, "") // Remove all non-word chars
      .replace(/_/g, "-") // replace underscores with dashes
      .replace(/\-\-+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, "") // Trim - from end of text
      .replace(/-/g, slugDivider); // Replace all - with whatever the slug divider is*/
};
exports.convertToSlug = convertToSlug;
// Replace spaces with underscores and make letters UPPERCASE:
// eg. "Some thing's" -> "SOME_THINGS"
const stringToConstantStyledString = (input) => {
    return (0, exports.convertToSlug)(input, {
        normalize: true,
        slugDivider: "_",
        letterCase: "UPPER",
    });
    // return input.replace(/[^\w\s]/g, "").replace("/\s+/g", "_").toUpperCase();
};
exports.stringToConstantStyledString = stringToConstantStyledString;
const reverse = (input) => {
    let r = ``;
    for (const char of input) {
        r = `${char}${r}`;
    }
    return r;
};
function isUriEncoded(uri) {
    uri = uri || "";
    return uri !== decodeURIComponent(uri);
}
const decodeUriFully = (uri) => {
    let failSafe = 0;
    while (isUriEncoded(uri)) {
        failSafe += 1;
        uri = decodeURIComponent(uri);
        if (failSafe > 20) {
            throw new Error(`String Utils: Decode URI Fully: Enacted while loop too many times with attempt to decode fully.`);
        }
    }
    return uri;
};
const removeAndTrim = (input, removeText, { spaceAware = true, insideWords = false } = {}) => {
    let text = `${input}`;
    for (const rem of removeText) {
        if (spaceAware) {
            if (!insideWords) {
                if (text.indexOf(` ${rem} `) >= 0) {
                    text = text.replace(` ${rem} `, " ");
                }
                else {
                    if (text.startsWith(`${rem} `)) {
                        text = text.substring(rem.length + 1);
                    }
                    if (text.endsWith(` ${rem}`)) {
                        text = text.substring(0, text.length - (rem.length + 1));
                    }
                }
            }
            else {
                const checkNew = [
                    new RegExp(`\\s${rem}\\s`, "g"),
                    new RegExp(`\\s${rem}`, "g"),
                    new RegExp(`${rem}\\s`, "g"),
                ];
                for (const remNew of checkNew) {
                    if (remNew.test(text)) {
                        console.log(`Replacing "${remNew}" in "${text}"`);
                        text = text.replace(remNew, " ");
                        console.log(`Text after: "${text}"`);
                    }
                }
            }
        }
        else {
            if (text.indexOf(rem) >= 0) {
                text = text.replace(rem, "");
            }
        }
    }
    return text.trim();
};
function sortCompareStrings(a, b) {
    const aa = a.toLowerCase();
    const bb = b.toLowerCase();
    if (aa < bb)
        //sort string ascending
        return -1;
    if (aa > bb)
        return 1;
    return 0; //default return value (no sorting)
}
function comparePure(a, b) {
    if (a > b) {
        return 1;
    }
    if (a < b) {
        return -1;
    }
    return 0;
}
function onlyNotNullEmpty(strArray) {
    let notNullEmptyArray = [];
    for (const str of strArray) {
        if ((0, exports.notNullEmpty)(str)) {
            notNullEmptyArray.push(str);
        }
    }
    return notNullEmptyArray;
}
const joinIntoUrl = (...routes) => {
    return routes
        .filter((v) => v)
        .map((v, i, arr) => {
        const isNotFirst = i !== 0;
        const isNotLast = i !== arr.length - 1;
        if (isNotFirst) {
            v = v.startsWith("/") ? v.slice(1) : v;
        }
        if (isNotLast) {
            v = v.endsWith("/") ? v.slice(0, -1) : v;
        }
        return v;
    })
        .join("/");
};
const getUrlWithBaseUrl = (baseUrl, route) => {
    const isRouteCompleted = route.startsWith("http://") || route.startsWith("https://");
    if (isRouteCompleted) {
        return route;
    }
    return joinIntoUrl(baseUrl, route);
};
const isHashId = (accountId) => {
    const hash = accountId.match(/^[a-zA-Z0-9]+$/);
    return Boolean(hash);
    // accountId.match(/^[a-zA-Z0-9]{64}$/)
};
exports.StringUtils = {
    isUriEncoded,
    decodeUriFully,
    StringRegex: exports.StringRegex,
    reverse,
    notNullEmpty: exports.notNullEmpty,
    nullEmpty: exports.nullEmpty,
    anyNullEmpty,
    safeAppend: exports.safeAppend,
    createPadder,
    pad,
    convertToSlug: exports.convertToSlug,
    stringToConstantStyledString: exports.stringToConstantStyledString,
    removeAndTrim,
    sortCompareStrings,
    comparePure,
    onlyNotNullEmpty,
    firstNotNullEmpty: exports.firstNotNullEmpty,
    joinIntoUrl,
    getUrlWithBaseUrl,
    isHashId,
};
//# sourceMappingURL=StringUtils.js.map