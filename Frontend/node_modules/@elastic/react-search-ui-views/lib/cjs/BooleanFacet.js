"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const view_helpers_1 = require("./view-helpers");
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
    return (react_1.default.createElement("fieldset", { className: (0, view_helpers_1.appendClassName)("sui-facet", className) },
        react_1.default.createElement("legend", { className: "sui-facet__title" }, label),
        react_1.default.createElement("div", { className: "sui-boolean-facet" },
            react_1.default.createElement("div", { className: "sui-boolean-facet__option-input-wrapper" },
                react_1.default.createElement("label", { className: "sui-boolean-facet__option-label" },
                    react_1.default.createElement("div", { className: "sui-boolean-facet__option-input-wrapper" },
                        react_1.default.createElement("input", { "data-transaction-name": `facet - ${label}`, className: "sui-boolean-facet__checkbox", type: "checkbox", onChange: toggle, checked: isSelected }),
                        react_1.default.createElement("span", { className: "sui-boolean-facet__input-text" }, label)),
                    react_1.default.createElement("span", { className: "sui-boolean-facet__option-count" }, trueOptions.count))))));
}
exports.default = BooleanFacet;
