/**
 * Set the current search term
 *
 * Will trigger new search
 *
 * @param searchTerm String
 * @param options Object Additional objects
 * @param autocompleteMinimumCharacters Number Only trigger autocomplete if
 * searchTerm has at least this number of characters
 * @param options.autocompleteResults Boolean Fetch autocomplete
 * results?
 * @param options.refresh Boolean Refresh search results?
 * @param options.debounce Length to debounce API calls
 */
declare type SetSearchTermOptions = {
    autocompleteMinimumCharacters?: number;
    autocompleteResults?: boolean;
    debounce?: number;
    refresh?: boolean;
    autocompleteSuggestions?: boolean;
    shouldClearFilters?: boolean;
};
export default function setSearchTerm(searchTerm: string, { autocompleteMinimumCharacters, autocompleteResults, autocompleteSuggestions, shouldClearFilters, refresh, debounce }?: SetSearchTermOptions): void;
export {};
