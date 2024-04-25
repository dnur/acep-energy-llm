"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
describe("accentFold", () => {
    it("should remove accents marks from string", () => {
        expect((0, helpers_1.accentFold)("ǟc̈ŗÄh")).toBe("acrAh");
        expect((0, helpers_1.accentFold)("abc")).toBe("abc");
        expect((0, helpers_1.accentFold)("ABC")).toBe("ABC");
        // anything other than string passed as argument should return empty string
        expect((0, helpers_1.accentFold)(123)).toBe("");
        expect((0, helpers_1.accentFold)({ a: 1, b: 2 })).toBe("");
        expect((0, helpers_1.accentFold)([1, 2])).toBe("");
        expect((0, helpers_1.accentFold)(null)).toBe("");
    });
});
