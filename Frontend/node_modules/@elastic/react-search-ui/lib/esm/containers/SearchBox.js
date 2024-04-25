var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { Component } from "react";
import { SearchBox } from "@elastic/react-search-ui-views";
import { withSearch } from "..";
export class SearchBoxContainer extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            isFocused: false
        };
        this.handleFocus = () => {
            this.setState({
                isFocused: true
            });
        };
        this.handleBlur = () => {
            this.setState({
                isFocused: false
            });
        };
        this.completeSuggestion = (searchTerm) => {
            const { shouldClearFilters, setSearchTerm } = this.props;
            setSearchTerm(searchTerm, {
                shouldClearFilters
            });
        };
        this.handleSubmit = (e) => {
            const { shouldClearFilters, searchTerm, setSearchTerm } = this.props;
            e.preventDefault();
            setSearchTerm(searchTerm, {
                shouldClearFilters
            });
        };
        this.handleChange = (value) => {
            const { autocompleteMinimumCharacters, autocompleteResults, autocompleteSuggestions, shouldClearFilters, searchAsYouType, setSearchTerm, debounceLength } = this.props;
            const options = Object.assign(Object.assign({ autocompleteMinimumCharacters }, ((autocompleteResults ||
                autocompleteSuggestions ||
                searchAsYouType) && {
                debounce: debounceLength || 200
            })), { shouldClearFilters, refresh: !!searchAsYouType, autocompleteResults: !!autocompleteResults, autocompleteSuggestions: !!autocompleteSuggestions });
            setSearchTerm(value, options);
        };
        this.handleNotifyAutocompleteSelected = (selection) => {
            var _a;
            const { autocompleteResults, trackAutocompleteClickThrough, trackAutocompleteSuggestionClickThrough } = this.props;
            // results
            if (autocompleteResults) {
                const autocompleteResultsConfig = autocompleteResults === true
                    ? { clickThroughTags: [], shouldTrackClickThrough: true }
                    : autocompleteResults;
                if (!selection.suggestion &&
                    autocompleteResultsConfig.shouldTrackClickThrough !== false) {
                    const { clickThroughTags = [] } = autocompleteResultsConfig;
                    const id = (_a = selection.id) === null || _a === void 0 ? void 0 : _a.raw;
                    trackAutocompleteClickThrough(id, clickThroughTags);
                }
                if (selection.suggestion) {
                    trackAutocompleteSuggestionClickThrough(selection.suggestion, selection.index, []);
                }
            }
        };
        this.defaultOnSelectAutocomplete = (selection) => {
            if (!selection)
                return;
            const { autocompleteResults } = this.props;
            this.handleNotifyAutocompleteSelected(selection);
            if (!selection.suggestion && typeof autocompleteResults !== "boolean") {
                const url = selection[autocompleteResults.urlField]
                    ? selection[autocompleteResults.urlField].raw
                    : "";
                if (url) {
                    const target = (typeof autocompleteResults !== "boolean" &&
                        autocompleteResults.linkTarget) ||
                        "_self";
                    window.open(url, target);
                }
            }
            else {
                this.completeSuggestion(selection.suggestion);
            }
        };
    }
    render() {
        const { isFocused } = this.state;
        const _a = this.props, { autocompleteMinimumCharacters, autocompleteResults, autocompleteSuggestions, autocompletedResults, autocompletedSuggestions, className, autocompleteView, inputProps, inputView, onSelectAutocomplete, onSubmit, searchTerm, view } = _a, rest = __rest(_a, ["autocompleteMinimumCharacters", "autocompleteResults", "autocompleteSuggestions", "autocompletedResults", "autocompletedSuggestions", "className", "autocompleteView", "inputProps", "inputView", "onSelectAutocomplete", "onSubmit", "searchTerm", "view"]);
        const View = view || SearchBox;
        const useAutocomplete = (!!autocompleteResults || !!autocompleteSuggestions) &&
            searchTerm.length >= autocompleteMinimumCharacters;
        const autocompletedSuggestionsCount = Object.entries(autocompletedSuggestions
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ).reduce((acc, [_, value]) => acc + value.length, 0);
        const allAutocompletedItemsCount = autocompletedSuggestionsCount + autocompletedResults.length;
        let handleOnSelectAutocomplete;
        if (onSelectAutocomplete) {
            handleOnSelectAutocomplete = (selection) => {
                onSelectAutocomplete(selection, {
                    notifyAutocompleteSelected: this.handleNotifyAutocompleteSelected,
                    completeSuggestion: this.completeSuggestion,
                    autocompleteResults: this.props.autocompleteResults
                }, this.defaultOnSelectAutocomplete);
            };
        }
        const viewProps = Object.assign({ allAutocompletedItemsCount: allAutocompletedItemsCount, autocompleteView, autocompleteResults: autocompleteResults, autocompleteSuggestions: autocompleteSuggestions, autocompletedResults: autocompletedResults, autocompletedSuggestions: autocompletedSuggestions, className, autocompletedSuggestionsCount: autocompletedSuggestionsCount, completeSuggestion: this.completeSuggestion, isFocused: isFocused, notifyAutocompleteSelected: this.handleNotifyAutocompleteSelected, onChange: (value) => this.handleChange(value), onSelectAutocomplete: handleOnSelectAutocomplete || this.defaultOnSelectAutocomplete, onSubmit: onSubmit
                ? (e) => {
                    e.preventDefault();
                    onSubmit(searchTerm);
                }
                : this.handleSubmit, useAutocomplete: useAutocomplete, value: searchTerm, inputProps: Object.assign({ onFocus: this.handleFocus, onBlur: this.handleBlur }, inputProps), inputView }, rest);
        return React.createElement(View, Object.assign({}, viewProps));
    }
}
SearchBoxContainer.defaultProps = {
    autocompleteMinimumCharacters: 0,
    shouldClearFilters: true
};
export default withSearch(({ autocompletedResults, autocompletedSuggestions, searchTerm, setSearchTerm, trackAutocompleteClickThrough, trackAutocompleteSuggestionClickThrough }) => ({
    autocompletedResults,
    autocompletedSuggestions,
    searchTerm,
    setSearchTerm,
    trackAutocompleteClickThrough,
    trackAutocompleteSuggestionClickThrough
}))(SearchBoxContainer);
