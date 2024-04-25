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
const react_select_1 = __importStar(require("react-select"));
const view_helpers_1 = require("./view-helpers");
const setDefaultStyle = {
    option: () => ({}),
    control: () => ({}),
    dropdownIndicator: () => ({}),
    indicatorSeparator: () => ({}),
    singleValue: (provided) => {
        // Pulling out CSS that we don't want
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { position, top, transform, maxWidth } = provided, rest = __rest(provided, ["position", "top", "transform", "maxWidth"]);
        return Object.assign(Object.assign({}, rest), { lineHeight: 1, marginRight: 0 });
    },
    valueContainer: (provided) => (Object.assign(Object.assign({}, provided), { paddingRight: 0 }))
};
const wrapOption = (option) => ({ label: option, value: option });
function Option(props) {
    return react_1.default.createElement(react_select_1.components.Option, Object.assign({}, props), props.data.label);
}
function ResultsPerPage(_a) {
    var { className, onChange, options, value: selectedValue } = _a, rest = __rest(_a, ["className", "onChange", "options", "value"]);
    let selectedOption = null;
    if (selectedValue) {
        selectedOption = wrapOption(selectedValue);
        if (!options.includes(selectedValue))
            options = [selectedValue, ...options];
    }
    return (react_1.default.createElement("div", Object.assign({ className: (0, view_helpers_1.appendClassName)("sui-results-per-page", className) }, rest),
        react_1.default.createElement("div", { className: "sui-results-per-page__label" }, "Show"),
        react_1.default.createElement(react_select_1.default, { className: "sui-select sui-select--inline", classNamePrefix: "sui-select", value: selectedOption, onChange: (o) => onChange(o.value), options: options.map(wrapOption), isSearchable: false, styles: setDefaultStyle, components: {
                Option: (props) => {
                    props.innerProps["data-transaction-name"] = `results per page`;
                    return Option(props);
                }
            } })));
}
exports.default = ResultsPerPage;
