import React from "react";
import { getFilterValueDisplay } from "./view-helpers";
import { appendClassName } from "./view-helpers";
function SingleLinksFacet({ className, label, onRemove, onSelect, options }) {
    const value = options.filter((o) => o.selected).map((o) => o.value)[0];
    return (React.createElement("div", { className: appendClassName("sui-facet", className) },
        React.createElement("div", null,
            React.createElement("div", { className: "sui-facet__title" }, label),
            React.createElement("ul", { className: "sui-single-option-facet" },
                value && (React.createElement("li", { className: "sui-single-option-facet__selected" },
                    getFilterValueDisplay(value),
                    " ",
                    React.createElement("span", { className: "sui-single-option-facet__remove" },
                        "(",
                        React.createElement("a", { onClick: (e) => {
                                e.preventDefault();
                                onRemove(value);
                            }, href: "/" }, "Remove"),
                        ")"))),
                !value &&
                    options.map((option) => (React.createElement("li", { className: "sui-single-option-facet__item", key: getFilterValueDisplay(option.value) },
                        React.createElement("a", { "data-transaction-name": `facet - ${label}`, className: "sui-single-option-facet__link", href: "/", onClick: (e) => {
                                e.preventDefault();
                                onSelect(option.value);
                            } }, getFilterValueDisplay(option.value)),
                        " ",
                        React.createElement("span", { className: "sui-facet__count" }, option.count))))))));
}
export default SingleLinksFacet;
