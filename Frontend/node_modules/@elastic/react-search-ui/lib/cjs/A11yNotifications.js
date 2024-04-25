"use strict";
/**
 * Accessibility notifications
 * @see packages/search-ui/src/A11yNotifications.js
 */
Object.defineProperty(exports, "__esModule", { value: true });
const defaultMessages = {
    moreFilters: ({ visibleOptionsCount, showingAll }) => {
        let message = showingAll ? "All " : "";
        message += `${visibleOptionsCount} options shown.`;
        return message;
    }
};
exports.default = defaultMessages;
