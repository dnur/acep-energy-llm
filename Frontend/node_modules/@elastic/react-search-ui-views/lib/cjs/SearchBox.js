"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const downshift_1 = __importDefault(require("downshift"));
const view_helpers_1 = require("./view-helpers");
const Autocomplete_1 = __importDefault(require("./Autocomplete"));
const SearchInput_1 = __importDefault(require("./SearchInput"));
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
    const AutocompleteView = autocompleteView || Autocomplete_1.default;
    const InputView = inputView || SearchInput_1.default;
    return (react_1.default.createElement(downshift_1.default, Object.assign({ inputValue: value, onChange: onSelectAutocomplete, onInputValueChange: (newValue) => {
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
        return (react_1.default.createElement("form", { onSubmit: (e) => {
                closeMenu();
                onSubmit(e);
            } },
            react_1.default.createElement("div", { className: (0, view_helpers_1.appendClassName)("sui-search-box", className) + autocompleteClass },
                react_1.default.createElement(InputView, Object.assign({}, downshiftProps, { getInputProps: (additionalProps) => {
                        const _a = additionalProps || {}, { className } = _a, rest = __rest(_a, ["className"]);
                        return getInputProps(Object.assign(Object.assign(Object.assign({ "data-transaction-name": "search input", placeholder: "Search" }, inputProps), { className: (0, view_helpers_1.appendClassName)("sui-search-box__text-input", [
                                inputProps.className,
                                className,
                                focusedClass
                            ]) }), rest));
                    }, getButtonProps: (additionalProps) => {
                        const _a = additionalProps || {}, { className } = _a, rest = __rest(_a, ["className"]);
                        return Object.assign({ "data-transaction-name": "search submit", type: "submit", value: "Search", className: (0, view_helpers_1.appendClassName)("button sui-search-box__submit", className) }, rest);
                    }, getAutocomplete: () => {
                        if (useAutocomplete &&
                            isOpen &&
                            allAutocompletedItemsCount > 0) {
                            return react_1.default.createElement(AutocompleteView, Object.assign({}, props, downshiftProps));
                        }
                        else {
                            return null;
                        }
                    } })))));
    }));
}
exports.default = SearchBox;
