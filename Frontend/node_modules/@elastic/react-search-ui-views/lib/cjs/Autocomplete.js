"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const view_helpers_1 = require("./view-helpers");
function getRaw(result, value) {
    if (!result[value] || !result[value].raw)
        return;
    return result[value].raw;
}
function getSnippet(result, value) {
    if (!result[value] || !result[value].snippet)
        return;
    return result[value].snippet;
}
function getSuggestionTitle(suggestionType, autocompleteSuggestions) {
    if (autocompleteSuggestions.sectionTitle) {
        return autocompleteSuggestions.sectionTitle;
    }
    if (autocompleteSuggestions[suggestionType] &&
        autocompleteSuggestions[suggestionType].sectionTitle) {
        return autocompleteSuggestions[suggestionType].sectionTitle;
    }
}
function getSuggestionDisplayField(suggestionType, autocompleteSuggestions) {
    if (autocompleteSuggestions.queryType === "results") {
        return autocompleteSuggestions.displayField;
    }
    if (autocompleteSuggestions[suggestionType] &&
        autocompleteSuggestions[suggestionType].queryType === "results") {
        return autocompleteSuggestions[suggestionType].displayField;
    }
}
function Autocomplete({ autocompleteResults, autocompletedResults, autocompleteSuggestions, autocompletedSuggestions, className, getItemProps, getMenuProps }) {
    let index = 0;
    return (react_1.default.createElement("div", Object.assign({}, getMenuProps({
        className: (0, view_helpers_1.appendClassName)("sui-search-box__autocomplete-container", className)
    })),
        react_1.default.createElement("div", null,
            !!autocompleteSuggestions &&
                Object.entries(autocompletedSuggestions).map(([suggestionType, suggestions]) => {
                    return (react_1.default.createElement(react_1.default.Fragment, { key: suggestionType },
                        getSuggestionTitle(suggestionType, autocompleteSuggestions) &&
                            suggestions.length > 0 && (react_1.default.createElement("div", { className: "sui-search-box__section-title" }, getSuggestionTitle(suggestionType, autocompleteSuggestions))),
                        suggestions.length > 0 && (react_1.default.createElement("ul", { className: "sui-search-box__suggestion-list" }, suggestions.map((suggestion) => {
                            var _a;
                            index++;
                            if (suggestion.queryType === "results") {
                                let displayField = null;
                                if (autocompleteSuggestions === true) {
                                    displayField = Object.keys(suggestion.result)[0];
                                }
                                else {
                                    displayField = getSuggestionDisplayField(suggestionType, autocompleteSuggestions);
                                }
                                const suggestionValue = (_a = suggestion.result[displayField]) === null || _a === void 0 ? void 0 : _a.raw;
                                return (react_1.default.createElement("li", Object.assign({}, getItemProps({
                                    key: suggestionValue,
                                    index: index - 1,
                                    item: {
                                        suggestion: suggestionValue
                                    }
                                }), { "data-transaction-name": "query suggestion" }),
                                    react_1.default.createElement("span", null, suggestionValue)));
                            }
                            return (react_1.default.createElement("li", Object.assign({}, getItemProps({
                                key: suggestion.suggestion || suggestion.highlight,
                                index: index - 1,
                                item: Object.assign(Object.assign({}, suggestion), { index: index - 1 })
                            }), { "data-transaction-name": "query suggestion" }), suggestion.highlight ? (react_1.default.createElement("span", { dangerouslySetInnerHTML: {
                                    __html: suggestion.highlight
                                } })) : (react_1.default.createElement("span", null, suggestion.suggestion))));
                        })))));
                }),
            !!autocompleteResults &&
                !!autocompletedResults &&
                typeof autocompleteResults !== "boolean" &&
                autocompletedResults.length > 0 &&
                autocompleteResults.sectionTitle && (react_1.default.createElement("div", { className: "sui-search-box__section-title" }, autocompleteResults.sectionTitle)),
            !!autocompleteResults &&
                !!autocompletedResults &&
                autocompletedResults.length > 0 && (react_1.default.createElement("ul", { className: "sui-search-box__results-list" }, autocompletedResults.map((result) => {
                index++;
                const titleField = typeof autocompleteResults === "boolean"
                    ? null
                    : autocompleteResults.titleField;
                const titleSnippet = getSnippet(result, titleField);
                const titleRaw = getRaw(result, titleField);
                return (react_1.default.createElement("li", Object.assign({}, getItemProps({
                    key: result.id.raw,
                    index: index - 1,
                    item: result
                })), titleSnippet ? (react_1.default.createElement("span", { dangerouslySetInnerHTML: {
                        __html: titleSnippet
                    } })) : (react_1.default.createElement("span", null, titleRaw))));
            }))))));
}
exports.default = Autocomplete;
