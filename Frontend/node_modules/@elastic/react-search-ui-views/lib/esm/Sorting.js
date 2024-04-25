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
import Select, { components } from "react-select";
import { appendClassName } from "./view-helpers";
const setDefaultStyle = {
    option: () => ({}),
    control: () => ({}),
    dropdownIndicator: () => ({}),
    indicatorSeparator: () => ({})
};
function Option(props) {
    return React.createElement(components.Option, Object.assign({}, props), props.data.label);
}
function Sorting(_a) {
    var { className, label, onChange, options, value } = _a, rest = __rest(_a, ["className", "label", "onChange", "options", "value"]);
    const selectedValue = value;
    const selectedOption = selectedValue
        ? options.find((option) => option.value === selectedValue)
        : null;
    return (React.createElement("div", Object.assign({ className: appendClassName("sui-sorting", className) }, rest),
        label && React.createElement("div", { className: "sui-sorting__label" }, label),
        React.createElement(Select, { className: "sui-select", classNamePrefix: "sui-select", value: selectedOption, onChange: (o) => onChange(o.value), options: options, isSearchable: false, styles: setDefaultStyle, components: {
                Option: (props) => {
                    props.innerProps["data-transaction-name"] = `sorting`;
                    return Option(props);
                }
            } })));
}
export default Sorting;
