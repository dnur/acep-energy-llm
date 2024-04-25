import React from "react";
import { appendClassName, getFilterValueDisplay } from "./view-helpers";
function MultiCheckboxFacet({ className, label, onMoreClick, onRemove, onSelect, options, showMore, showSearch, onSearch, searchPlaceholder }) {
    return (React.createElement("fieldset", { className: appendClassName("sui-facet", className) },
        React.createElement("legend", { className: "sui-facet__title" }, label),
        showSearch && (React.createElement("div", { className: "sui-facet-search" },
            React.createElement("input", { className: "sui-facet-search__text-input", type: "search", placeholder: searchPlaceholder || "Search", onChange: (e) => {
                    onSearch(e.target.value);
                } }))),
        React.createElement("div", { className: "sui-multi-checkbox-facet" },
            options.length < 1 && React.createElement("div", null, "No matching options"),
            options.map((option) => {
                const checked = option.selected;
                const value = option.value;
                return (React.createElement("label", { key: `${getFilterValueDisplay(option.value)}`, htmlFor: `example_facet_${label}${getFilterValueDisplay(option.value)}`, className: "sui-multi-checkbox-facet__option-label" },
                    React.createElement("div", { className: "sui-multi-checkbox-facet__option-input-wrapper" },
                        React.createElement("input", { "data-transaction-name": `facet - ${label}`, id: `example_facet_${label}${getFilterValueDisplay(option.value)}`, type: "checkbox", className: "sui-multi-checkbox-facet__checkbox", checked: checked, onChange: () => (checked ? onRemove(value) : onSelect(value)) }),
                        React.createElement("span", { className: "sui-multi-checkbox-facet__input-text" }, getFilterValueDisplay(option.value))),
                    React.createElement("span", { className: "sui-multi-checkbox-facet__option-count" }, option.count.toLocaleString("en"))));
            })),
        showMore && (React.createElement("button", { type: "button", className: "sui-facet-view-more", onClick: onMoreClick, "aria-label": "Show more options" }, "+ More"))));
}
export default MultiCheckboxFacet;
