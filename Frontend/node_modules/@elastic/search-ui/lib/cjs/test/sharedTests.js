"use strict";
/* eslint-disable jest/no-export */
Object.defineProperty(exports, "__esModule", { value: true });
exports.itUpdatesURLState = exports.itFetchesResults = exports.itResetsFilters = exports.itResetsCurrent = void 0;
const helpers_1 = require("../test/helpers");
function itResetsCurrent(fn) {
    const state = fn();
    it("resets current", () => {
        expect(state.current).toEqual(1);
    });
}
exports.itResetsCurrent = itResetsCurrent;
function itResetsFilters(fn) {
    const state = fn();
    it("resets filters", () => {
        expect(state.filters).toEqual([]);
    });
}
exports.itResetsFilters = itResetsFilters;
function itFetchesResults(fn) {
    it("fetches results", () => {
        const state = fn();
        expect((0, helpers_1.doesStateHaveResponseData)(state)).toBe(true);
    });
}
exports.itFetchesResults = itFetchesResults;
function itUpdatesURLState(MockedURLManager, fn) {
    it("Updates URL state", () => {
        fn();
        expect(MockedURLManager.mock.instances[0].pushStateToURL.mock.calls).toHaveLength(1);
    });
}
exports.itUpdatesURLState = itUpdatesURLState;
