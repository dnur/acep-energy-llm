"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @jest-environment jsdom
 */
const A11yNotifications_1 = require("../A11yNotifications");
it("creates a live screen reader region", () => {
    // Before init
    let region = document.getElementById("search-ui-screen-reader-notifications");
    expect(region).toBeNull();
    // After init
    region = (0, A11yNotifications_1.getLiveRegion)();
    expect(region).not.toBeNull();
    expect(region.getAttribute("role")).toEqual("status");
    expect(region.getAttribute("aria-live")).toEqual("polite");
    expect(region.style.overflow).toEqual("hidden");
});
it("updates the live region correctly via announceToScreenReader", () => {
    (0, A11yNotifications_1.announceToScreenReader)("Hello world!");
    const region = document.getElementById("search-ui-screen-reader-notifications");
    expect(region.textContent).toEqual("Hello world!");
});
describe("defaultMessages", () => {
    it("outputs searchResults correctly", () => {
        expect(A11yNotifications_1.defaultMessages.searchResults({
            start: "1",
            end: "20",
            totalResults: "50",
            searchTerm: "foo"
        })).toEqual('Showing 1 to 20 results out of 50, searching for "foo".');
        expect(A11yNotifications_1.defaultMessages.searchResults({
            start: "0",
            end: "0",
            totalResults: "0",
            searchTerm: ""
        })).toEqual("Showing 0 to 0 results out of 0");
    });
});
