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
    return React.createElement(components.Option, Object.assign({}, props), props.data.label);
}
function ResultsPerPage(_a) {
    var { className, onChange, options, value: selectedValue } = _a, rest = __rest(_a, ["className", "onChange", "options", "value"]);
    let selectedOption = null;
    if (selectedValue) {
        selectedOption = wrapOption(selectedValue);
        if (!options.includes(selectedValue))
            options = [selectedValue, ...options];
    }
    return (React.createElement("div", Object.assign({ className: appendClassName("sui-results-per-page", className) }, rest),
        React.createElement("div", { className: "sui-results-per-page__label" }, "Show"),
        React.createElement(Select, { className: "sui-select sui-select--inline", classNamePrefix: "sui-select", value: selectedOption, onChange: (o) => onChange(o.value), options: options.map(wrapOption), isSearchable: false, styles: setDefaultStyle, components: {
                Option: (props) => {
                    props.innerProps["data-transaction-name"] = `results per page`;
                    return Option(props);
                }
            } })));
}
export default ResultsPerPage;
