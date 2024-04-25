"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const view_helpers_1 = require("./view-helpers");
const view_helpers_2 = require("./view-helpers");
function SingleLinksFacet({ className, label, onRemove, onSelect, options }) {
    const value = options.filter((o) => o.selected).map((o) => o.value)[0];
    return (react_1.default.createElement("div", { className: (0, view_helpers_2.appendClassName)("sui-facet", className) },
        react_1.default.createElement("div", null,
            react_1.default.createElement("div", { className: "sui-facet__title" }, label),
            react_1.default.createElement("ul", { className: "sui-single-option-facet" },
                value && (react_1.default.createElement("li", { className: "sui-single-option-facet__selected" },
                    (0, view_helpers_1.getFilterValueDisplay)(value),
                    " ",
                    react_1.default.createElement("span", { className: "sui-single-option-facet__remove" },
                        "(",
                        react_1.default.createElement("a", { onClick: (e) => {
                                e.preventDefault();
                                onRemove(value);
                            }, href: "/" }, "Remove"),
                        ")"))),
                !value &&
                    options.map((option) => (react_1.default.createElement("li", { className: "sui-single-option-facet__item", key: (0, view_helpers_1.getFilterValueDisplay)(option.value) },
                        react_1.default.createElement("a", { "data-transaction-name": `facet - ${label}`, className: "sui-single-option-facet__link", href: "/", onClick: (e) => {
                                e.preventDefault();
                                onSelect(option.value);
                            } }, (0, view_helpers_1.getFilterValueDisplay)(option.value)),
                        " ",
                        react_1.default.createElement("span", { className: "sui-facet__count" }, option.count))))))));
}
exports.default = SingleLinksFacet;
