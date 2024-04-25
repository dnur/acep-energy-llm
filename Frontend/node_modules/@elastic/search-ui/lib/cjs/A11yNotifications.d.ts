declare const getLiveRegion: () => HTMLElement | null;
declare const announceToScreenReader: (announcement: string) => void;
declare const defaultMessages: {
    searchResults: ({ start, end, totalResults, searchTerm }: {
        start: string;
        end: string;
        totalResults: string;
        searchTerm: string;
    }) => string;
};
export { getLiveRegion, announceToScreenReader, defaultMessages };
