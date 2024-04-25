"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prop_types_1 = __importDefault(require("prop-types"));
const react_1 = __importDefault(require("react"));
const react_select_1 = __importStar(require("react-select"));
const view_helpers_1 = require("./view-helpers");
const view_helpers_2 = require("./view-helpers");
function Option(props) {
    return (react_1.default.createElement(react_select_1.components.Option, Object.assign({}, props),
        react_1.default.createElement("span", { className: "sui-select__option-label" }, props.data.label),
        react_1.default.createElement("span", { className: "sui-select__option-count" }, props.data.count.toLocaleString("en"))));
}
Option.propTypes = {
    data: prop_types_1.default.object.isRequired
};
function toSelectBoxOption(filterValue) {
    return {
        value: filterValue.value,
        label: (0, view_helpers_1.getFilterValueDisplay)(filterValue.value),
        count: filterValue.count
    };
}
const setDefaultStyle = {
    option: () => ({}),
    control: () => ({}),
    dropdownIndicator: () => ({}),
    indicatorSeparator: () => ({})
};
function SingleSelectFacet({ className, label, onChange, options }) {
    let selectedSelectBoxOption;
    let isSelectedSelectBoxOptionSet = false;
    const selectBoxOptions = options.map((option) => {
        const selectBoxOption = toSelectBoxOption(option);
        // There should never be multiple filters set for this facet because it is single select,
        // but if there is, we use the first value.
        if (option.selected && !isSelectedSelectBoxOptionSet) {
            selectedSelectBoxOption = selectBoxOption;
            isSelectedSelectBoxOptionSet = true;
        }
        return selectBoxOption;
    });
    return (react_1.default.createElement("div", { className: (0, view_helpers_2.appendClassName)("sui-facet", className) },
        react_1.default.createElement("div", { className: "sui-facet__title" }, label),
        react_1.default.createElement(react_select_1.default, { className: "sui-select", classNamePrefix: "sui-select", components: {
                Option: (props) => {
                    props.innerProps["data-transaction-name"] = `facet - ${label}`;
                    return Option(props);
                }
            }, value: selectedSelectBoxOption, onChange: (o) => onChange(o.value), options: selectBoxOptions, isSearchable: false, styles: setDefaultStyle })));
}
exports.default = SingleSelectFacet;
