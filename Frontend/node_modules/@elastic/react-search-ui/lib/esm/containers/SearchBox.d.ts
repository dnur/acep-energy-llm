import React, { Component } from "react";
import { SearchBoxContainerProps, SearchBoxContainerContext } from "@elastic/react-search-ui-views";
export declare class SearchBoxContainer extends Component<SearchBoxContainerProps> {
    static defaultProps: {
        autocompleteMinimumCharacters: number;
        shouldClearFilters: boolean;
    };
    state: {
        isFocused: boolean;
    };
    handleFocus: () => void;
    handleBlur: () => void;
    completeSuggestion: (searchTerm: any) => void;
    handleSubmit: (e: any) => void;
    handleChange: (value: any) => void;
    handleNotifyAutocompleteSelected: (selection: any) => void;
    defaultOnSelectAutocomplete: (selection: any) => void;
    render(): JSX.Element;
}
declare const _default: React.ComponentType<Omit<SearchBoxContainerProps, "searchTerm" | "autocompletedResults" | "autocompletedSuggestions" | "trackAutocompleteClickThrough" | "setSearchTerm" | "trackAutocompleteSuggestionClickThrough"> & {
    mapContextToProps?: (context: import("../withSearch").SearchContextState) => SearchBoxContainerContext;
}>;
export default _default;
