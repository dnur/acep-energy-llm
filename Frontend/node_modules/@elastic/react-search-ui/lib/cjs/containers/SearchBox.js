"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchBoxContainer = void 0;
const react_1 = __importStar(require("react"));
const react_search_ui_views_1 = require("@elastic/react-search-ui-views");
const __1 = require("..");
class SearchBoxContainer extends react_1.Component {
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
        const View = view || react_search_ui_views_1.SearchBox;
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
        return react_1.default.createElement(View, Object.assign({}, viewProps));
    }
}
exports.SearchBoxContainer = SearchBoxContainer;
SearchBoxContainer.defaultProps = {
    autocompleteMinimumCharacters: 0,
    shouldClearFilters: true
};
exports.default = (0, __1.withSearch)(({ autocompletedResults, autocompletedSuggestions, searchTerm, setSearchTerm, trackAutocompleteClickThrough, trackAutocompleteSuggestionClickThrough }) => ({
    autocompletedResults,
    autocompletedSuggestions,
    searchTerm,
    setSearchTerm,
    trackAutocompleteClickThrough,
    trackAutocompleteSuggestionClickThrough
}))(SearchBoxContainer);
