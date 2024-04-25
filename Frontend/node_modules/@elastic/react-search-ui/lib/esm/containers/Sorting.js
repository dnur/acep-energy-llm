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
import React, { Component } from "react";
import { withSearch } from "..";
import { Sorting } from "@elastic/react-search-ui-views";
function findSortOption(sortOptions, sortData) {
    if (sortData.indexOf("|||") === -1) {
        return sortOptions.find((option) => JSON.stringify(option.value) === sortData);
    }
    const [value, direction] = sortData.split("|||");
    return sortOptions.find((option) => option.value === value && option.direction === direction);
}
function formatValue(sortField, sortDirection, sortList) {
    if (sortList && sortList.length > 0) {
        return JSON.stringify(sortList);
    }
    return `${sortField}|||${sortDirection}`;
}
function formatSelectValues(sortOption) {
    if (Array.isArray(sortOption.value)) {
        // save value as string for comparison
        return JSON.stringify(sortOption.value);
    }
    else {
        return formatValue(sortOption.value, sortOption.direction, null);
    }
}
function formatSelectOption(sortOption) {
    return {
        label: sortOption.name,
        value: formatSelectValues(sortOption)
    };
}
export class SortingContainer extends Component {
    render() {
        const _a = this.props, { className, label, setSort, sortDirection, sortField, sortList, sortOptions, view } = _a, rest = __rest(_a, ["className", "label", "setSort", "sortDirection", "sortField", "sortList", "sortOptions", "view"]);
        const View = view || Sorting;
        const viewProps = Object.assign({ className,
            label, onChange: (o) => {
                const sortOption = findSortOption(sortOptions, o);
                setSort(sortOption.value, sortOption.direction);
            }, options: sortOptions.map(formatSelectOption), value: formatValue(sortField, sortDirection, sortList) }, rest);
        return React.createElement(View, Object.assign({}, viewProps));
    }
}
export default withSearch(({ sortDirection, sortField, sortList, setSort }) => ({
    sortDirection,
    sortField,
    sortList,
    setSort
}))(SortingContainer);
