/**
 * Accessibility notifications
 * @see packages/search-ui/src/A11yNotifications.js
 */
declare const defaultMessages: {
    moreFilters: ({ visibleOptionsCount, showingAll }: {
        visibleOptionsCount: any;
        showingAll: any;
    }) => string;
};
export default defaultMessages;
