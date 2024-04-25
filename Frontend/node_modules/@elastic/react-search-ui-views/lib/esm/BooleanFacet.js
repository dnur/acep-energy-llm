import React from "react";
import { appendClassName } from "./view-helpers";
function BooleanFacet({ className, label, options, onChange, onRemove, values }) {
    const trueOptions = options.find((option) => option.value === "true");
    if (!trueOptions)
        return null;
    const isSelected = values.includes("true");
    const apply = () => onChange("true");
    const remove = () => onRemove("true");
    const toggle = () => {
        isSelected ? remove() : apply();
    };
    return (React.createElement("fieldset", { className: appendClassName("sui-facet", className) },
        React.createElement("legend", { className: "sui-facet__title" }, label),
        React.createElement("div", { className: "sui-boolean-facet" },
            React.createElement("div", { className: "sui-boolean-facet__option-input-wrapper" },
                React.createElement("label", { className: "sui-boolean-facet__option-label" },
                    React.createElement("div", { className: "sui-boolean-facet__option-input-wrapper" },
                        React.createElement("input", { "data-transaction-name": `facet - ${label}`, className: "sui-boolean-facet__checkbox", type: "checkbox", onChange: toggle, checked: isSelected }),
                        React.createElement("span", { className: "sui-boolean-facet__input-text" }, label)),
                    React.createElement("span", { className: "sui-boolean-facet__option-count" }, trueOptions.count))))));
}
export default BooleanFacet;
