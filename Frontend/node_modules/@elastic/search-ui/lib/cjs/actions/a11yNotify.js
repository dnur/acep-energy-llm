"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const A11yNotifications_1 = require("../A11yNotifications");
/**
 * Announces a specific message in `a11yNotificationMessages`
 * to Search UI's screen reader live region.
 *
 * @param {string} messageFunc - key of a message function in `a11yNotificationMessages`
 * @param {object} [messageArgs] - arguments to pass to the message function, if any
 */
function a11yNotify(messageFunc, messageArgs) {
    if (!this.hasA11yNotifications)
        return;
    const getMessage = this.a11yNotificationMessages[messageFunc];
    if (!getMessage) {
        const errorMessage = `Could not find corresponding message function in a11yNotificationMessages: "${messageFunc}"`;
        console.warn("Action", "a11yNotify", errorMessage);
        return;
    }
    const message = getMessage(messageArgs);
    (0, A11yNotifications_1.announceToScreenReader)(message);
    if (this.debug) {
        // eslint-disable-next-line no-console
        console.log("Search UI: Action", "a11yNotify", {
            messageFunc,
            messageArgs,
            message
        });
    }
}
exports.default = a11yNotify;
