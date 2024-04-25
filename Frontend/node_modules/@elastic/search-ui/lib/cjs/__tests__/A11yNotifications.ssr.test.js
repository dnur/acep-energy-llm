"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @jest-environment node
 */
const A11yNotifications_1 = require("../A11yNotifications");
it("does not crash or create errors in server-side rendered apps", () => {
    expect((0, A11yNotifications_1.getLiveRegion)()).toBeNull();
    expect(() => {
        (0, A11yNotifications_1.announceToScreenReader)("test");
    }).not.toThrowError();
});
