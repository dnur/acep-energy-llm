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
import React from "react";
import Downshift from "downshift";
import { appendClassName } from "./view-helpers";
import Autocomplete from "./Autocomplete";
import SearchInput from "./SearchInput";
function SearchBox(props) {
    const { className, allAutocompletedItemsCount, autocompleteView, isFocused, inputProps = { className: "" }, inputView, onChange, onSelectAutocomplete, onSubmit, useAutocomplete, value, 
    // NOTE: These are explicitly de-structured but not used so that they are
    // not passed through to the input with the 'rest' parameter
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    autocompletedResults, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    autocompletedSuggestions, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    autocompletedSuggestionsCount, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    completeSuggestion, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    notifyAutocompleteSelected } = props, rest = __rest(props, ["className", "allAutocompletedItemsCount", "autocompleteView", "isFocused", "inputProps", "inputView", "onChange", "onSelectAutocomplete", "onSubmit", "useAutocomplete", "value", "autocompletedResults", "autocompletedSuggestions", "autocompletedSuggestionsCount", "completeSuggestion", "notifyAutocompleteSelected"]);
    const focusedClass = isFocused ? "focus" : "";
    const AutocompleteView = autocompleteView || Autocomplete;
    const InputView = inputView || SearchInput;
    return (React.createElement(Downshift, Object.assign({ inputValue: value, onChange: onSelectAutocomplete, onInputValueChange: (newValue) => {
            // To avoid over dispatching
            if (value === newValue)
                return;
            onChange(newValue);
        }, 
        // Because when a selection is made, we don't really want to change
        // the inputValue. This is supposed to be a "controlled" value, and when
        // this happens we lose control of it.
        itemToString: () => value }, rest), (downshiftProps) => {
        const { closeMenu, getInputProps, isOpen } = downshiftProps;
        const autocompleteClass = isOpen === true ? " autocomplete" : "";
        return (React.createElement("form", { onSubmit: (e) => {
                closeMenu();
                onSubmit(e);
            } },
            React.createElement("div", { className: appendClassName("sui-search-box", className) + autocompleteClass },
                React.createElement(InputView, Object.assign({}, downshiftProps, { getInputProps: (additionalProps) => {
                        const _a = additionalProps || {}, { className } = _a, rest = __rest(_a, ["className"]);
                        return getInputProps(Object.assign(Object.assign(Object.assign({ "data-transaction-name": "search input", placeholder: "Search" }, inputProps), { className: appendClassName("sui-search-box__text-input", [
                                inputProps.className,
                                className,
                                focusedClass
                            ]) }), rest));
                    }, getButtonProps: (additionalProps) => {
                        const _a = additionalProps || {}, { className } = _a, rest = __rest(_a, ["className"]);
                        return Object.assign({ "data-transaction-name": "search submit", type: "submit", value: "Search", className: appendClassName("button sui-search-box__submit", className) }, rest);
                    }, getAutocomplete: () => {
                        if (useAutocomplete &&
                            isOpen &&
                            allAutocompletedItemsCount > 0) {
                            return React.createElement(AutocompleteView, Object.assign({}, props, downshiftProps));
                        }
                        else {
                            return null;
                        }
                    } })))));
    }));
}
export default SearchBox;
