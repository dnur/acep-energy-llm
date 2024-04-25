"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const view_helpers_1 = require("./view-helpers");
function MultiCheckboxFacet({ className, label, onMoreClick, onRemove, onSelect, options, showMore, showSearch, onSearch, searchPlaceholder }) {
    return (react_1.default.createElement("fieldset", { className: (0, view_helpers_1.appendClassName)("sui-facet", className) },
        react_1.default.createElement("legend", { className: "sui-facet__title" }, label),
        showSearch && (react_1.default.createElement("div", { className: "sui-facet-search" },
            react_1.default.createElement("input", { className: "sui-facet-search__text-input", type: "search", placeholder: searchPlaceholder || "Search", onChange: (e) => {
                    onSearch(e.target.value);
                } }))),
        react_1.default.createElement("div", { className: "sui-multi-checkbox-facet" },
            options.length < 1 && react_1.default.createElement("div", null, "No matching options"),
            options.map((option) => {
                const checked = option.selected;
                const value = option.value;
                return (react_1.default.createElement("label", { key: `${(0, view_helpers_1.getFilterValueDisplay)(option.value)}`, htmlFor: `example_facet_${label}${(0, view_helpers_1.getFilterValueDisplay)(option.value)}`, className: "sui-multi-checkbox-facet__option-label" },
                    react_1.default.createElement("div", { className: "sui-multi-checkbox-facet__option-input-wrapper" },
                        react_1.default.createElement("input", { "data-transaction-name": `facet - ${label}`, id: `example_facet_${label}${(0, view_helpers_1.getFilterValueDisplay)(option.value)}`, type: "checkbox", className: "sui-multi-checkbox-facet__checkbox", checked: checked, onChange: () => (checked ? onRemove(value) : onSelect(value)) }),
                        react_1.default.createElement("span", { className: "sui-multi-checkbox-facet__input-text" }, (0, view_helpers_1.getFilterValueDisplay)(option.value))),
                    react_1.default.createElement("span", { className: "sui-multi-checkbox-facet__option-count" }, option.count.toLocaleString("en"))));
            })),
        showMore && (react_1.default.createElement("button", { type: "button", className: "sui-facet-view-more", onClick: onMoreClick, "aria-label": "Show more options" }, "+ More"))));
}
exports.default = MultiCheckboxFacet;
