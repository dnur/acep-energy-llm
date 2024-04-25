"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const view_helpers_1 = require("../../view-helpers");
it("will append a className", () => {
    expect((0, view_helpers_1.appendClassName)("a", "b")).toBe("a b");
});
it("will handle an empty base className", () => {
    expect((0, view_helpers_1.appendClassName)("", "b")).toBe("b");
});
it("will handle an empty new className", () => {
    expect((0, view_helpers_1.appendClassName)("a")).toBe("a");
});
it("will handle a missing new className", () => {
    expect((0, view_helpers_1.appendClassName)()).toBe("");
});
it("will accept an array", () => {
    expect((0, view_helpers_1.appendClassName)("a", ["b", null, "", "c"])).toBe("a b c");
});
