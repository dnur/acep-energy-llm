import React from "react";
import { appendClassName } from "./view-helpers";
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
    return (React.createElement("div", Object.assign({}, getMenuProps({
        className: appendClassName("sui-search-box__autocomplete-container", className)
    })),
        React.createElement("div", null,
            !!autocompleteSuggestions &&
                Object.entries(autocompletedSuggestions).map(([suggestionType, suggestions]) => {
                    return (React.createElement(React.Fragment, { key: suggestionType },
                        getSuggestionTitle(suggestionType, autocompleteSuggestions) &&
                            suggestions.length > 0 && (React.createElement("div", { className: "sui-search-box__section-title" }, getSuggestionTitle(suggestionType, autocompleteSuggestions))),
                        suggestions.length > 0 && (React.createElement("ul", { className: "sui-search-box__suggestion-list" }, suggestions.map((suggestion) => {
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
                                return (React.createElement("li", Object.assign({}, getItemProps({
                                    key: suggestionValue,
                                    index: index - 1,
                                    item: {
                                        suggestion: suggestionValue
                                    }
                                }), { "data-transaction-name": "query suggestion" }),
                                    React.createElement("span", null, suggestionValue)));
                            }
                            return (React.createElement("li", Object.assign({}, getItemProps({
                                key: suggestion.suggestion || suggestion.highlight,
                                index: index - 1,
                                item: Object.assign(Object.assign({}, suggestion), { index: index - 1 })
                            }), { "data-transaction-name": "query suggestion" }), suggestion.highlight ? (React.createElement("span", { dangerouslySetInnerHTML: {
                                    __html: suggestion.highlight
                                } })) : (React.createElement("span", null, suggestion.suggestion))));
                        })))));
                }),
            !!autocompleteResults &&
                !!autocompletedResults &&
                typeof autocompleteResults !== "boolean" &&
                autocompletedResults.length > 0 &&
                autocompleteResults.sectionTitle && (React.createElement("div", { className: "sui-search-box__section-title" }, autocompleteResults.sectionTitle)),
            !!autocompleteResults &&
                !!autocompletedResults &&
                autocompletedResults.length > 0 && (React.createElement("ul", { className: "sui-search-box__results-list" }, autocompletedResults.map((result) => {
                index++;
                const titleField = typeof autocompleteResults === "boolean"
                    ? null
                    : autocompleteResults.titleField;
                const titleSnippet = getSnippet(result, titleField);
                const titleRaw = getRaw(result, titleField);
                return (React.createElement("li", Object.assign({}, getItemProps({
                    key: result.id.raw,
                    index: index - 1,
                    item: result
                })), titleSnippet ? (React.createElement("span", { dangerouslySetInnerHTML: {
                        __html: titleSnippet
                    } })) : (React.createElement("span", null, titleRaw))));
            }))))));
}
export default Autocomplete;
