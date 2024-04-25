"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../test/helpers");
// Mock announceToScreenReader so that we can spy on it
jest.mock("../../A11yNotifications");
const A11yNotifications_1 = require("../../A11yNotifications");
beforeEach(() => {
    jest.clearAllMocks();
});
describe("#a11yNotify", () => {
    const config = {
        hasA11yNotifications: true,
        a11yNotificationMessages: {
            customMessage: () => "Hello world"
        }
    };
    it("runs", () => {
        const { driver } = (0, helpers_1.setupDriver)(config);
        driver.a11yNotify("customMessage");
        expect(A11yNotifications_1.announceToScreenReader).toHaveBeenCalledWith("Hello world");
    });
    it("does not run if hasA11yNotifications is false", () => {
        const { driver } = (0, helpers_1.setupDriver)(Object.assign(Object.assign({}, config), { hasA11yNotifications: false }));
        driver.a11yNotify("customMessage");
        expect(A11yNotifications_1.announceToScreenReader).not.toHaveBeenCalled();
    });
    it("does not run if a valid a11yNotificationMessage function is not found", () => {
        const { driver } = (0, helpers_1.setupDriver)(config);
        driver.a11yNotify("invalid");
        expect(A11yNotifications_1.announceToScreenReader).not.toHaveBeenCalled();
    });
    it("logs expected console messages", () => {
        // Spy on and silence expected console messages
        jest.spyOn(global.console, "log").mockImplementation();
        jest.spyOn(global.console, "warn").mockImplementation();
        const { driver } = (0, helpers_1.setupDriver)(Object.assign(Object.assign({}, config), { debug: true }));
        driver.a11yNotify("customMessage", { foo: "bar" });
        expect(global.console.log).toHaveBeenCalledWith("Search UI: Action", "a11yNotify", {
            messageFunc: "customMessage",
            messageArgs: { foo: "bar" },
            message: "Hello world"
        });
        driver.a11yNotify("invalid");
        expect(global.console.warn).toHaveBeenCalledWith("Action", "a11yNotify", 'Could not find corresponding message function in a11yNotificationMessages: "invalid"');
    });
});
