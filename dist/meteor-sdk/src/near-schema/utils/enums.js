"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Assignable = exports.Enum = void 0;
/** @hidden @module */
class Enum {
    constructor(properties) {
        if (Object.keys(properties).length !== 1) {
            throw new Error("Enum can only take single value");
        }
        Object.keys(properties).map((key) => {
            this[key] = properties[key];
            this.enum = key;
        });
    }
}
exports.Enum = Enum;
class Assignable {
    constructor(properties) {
        Object.keys(properties).map((key) => {
            this[key] = properties[key];
        });
    }
}
exports.Assignable = Assignable;
//# sourceMappingURL=enums.js.map