/**
 * Announces a specific message in `a11yNotificationMessages`
 * to Search UI's screen reader live region.
 *
 * @param {string} messageFunc - key of a message function in `a11yNotificationMessages`
 * @param {object} [messageArgs] - arguments to pass to the message function, if any
 */
export default function a11yNotify(messageFunc: string, messageArgs?: unknown): void;
