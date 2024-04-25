/// <reference types="react" />
import type { AutocompletedResult, AutocompletedSuggestions, AutocompleteResult, AutocompleteSuggestion } from "@elastic/search-ui";
export declare type SearchBoxAutocompleteViewProps = {
    allAutocompletedItemsCount: number;
    autocompleteResults?: boolean | AutocompleteResult;
    autocompletedResults: AutocompletedResult[];
    autocompletedSuggestions: AutocompletedSuggestions;
    autocompletedSuggestionsCount: number;
    autocompleteSuggestions?: boolean | AutocompleteSuggestion;
    getItemProps: ({ key: string, index: number, item: AutocompletedSuggestion }: {
        key: any;
        index: any;
        item: any;
    }) => any;
    getMenuProps: ({ className: string }: {
        className: any;
    }) => any;
    className?: string;
};
declare function Autocomplete({ autocompleteResults, autocompletedResults, autocompleteSuggestions, autocompletedSuggestions, className, getItemProps, getMenuProps }: SearchBoxAutocompleteViewProps): JSX.Element;
export default Autocomplete;
