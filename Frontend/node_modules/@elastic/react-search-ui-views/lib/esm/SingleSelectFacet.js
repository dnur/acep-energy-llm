import PropTypes from "prop-types";
import React from "react";
import Select, { components } from "react-select";
import { getFilterValueDisplay } from "./view-helpers";
import { appendClassName } from "./view-helpers";
function Option(props) {
    return (React.createElement(components.Option, Object.assign({}, props),
        React.createElement("span", { className: "sui-select__option-label" }, props.data.label),
        React.createElement("span", { className: "sui-select__option-count" }, props.data.count.toLocaleString("en"))));
}
Option.propTypes = {
    data: PropTypes.object.isRequired
};
function toSelectBoxOption(filterValue) {
    return {
        value: filterValue.value,
        label: getFilterValueDisplay(filterValue.value),
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
    return (React.createElement("div", { className: appendClassName("sui-facet", className) },
        React.createElement("div", { className: "sui-facet__title" }, label),
        React.createElement(Select, { className: "sui-select", classNamePrefix: "sui-select", components: {
                Option: (props) => {
                    props.innerProps["data-transaction-name"] = `facet - ${label}`;
                    return Option(props);
                }
            }, value: selectedSelectBoxOption, onChange: (o) => onChange(o.value), options: selectBoxOptions, isSearchable: false, styles: setDefaultStyle })));
}
export default SingleSelectFacet;
