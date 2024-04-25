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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortingContainer = void 0;
const react_1 = __importStar(require("react"));
const __1 = require("..");
const react_search_ui_views_1 = require("@elastic/react-search-ui-views");
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
class SortingContainer extends react_1.Component {
    render() {
        const _a = this.props, { className, label, setSort, sortDirection, sortField, sortList, sortOptions, view } = _a, rest = __rest(_a, ["className", "label", "setSort", "sortDirection", "sortField", "sortList", "sortOptions", "view"]);
        const View = view || react_search_ui_views_1.Sorting;
        const viewProps = Object.assign({ className,
            label, onChange: (o) => {
                const sortOption = findSortOption(sortOptions, o);
                setSort(sortOption.value, sortOption.direction);
            }, options: sortOptions.map(formatSelectOption), value: formatValue(sortField, sortDirection, sortList) }, rest);
        return react_1.default.createElement(View, Object.assign({}, viewProps));
    }
}
exports.SortingContainer = SortingContainer;
exports.default = (0, __1.withSearch)(({ sortDirection, sortField, sortList, setSort }) => ({
    sortDirection,
    sortField,
    sortList,
    setSort
}))(SortingContainer);
