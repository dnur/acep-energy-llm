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
import { helpers } from "@elastic/search-ui";
function removeName(v) {
    if (helpers.isFilterValueRange(v)) {
        // eslint-disable-next-line
        const { name } = v, rest = __rest(v, ["name"]);
        return Object.assign({}, rest);
    }
    return v;
}
function rollup(f) {
    const hasRangeInValues = f.values.some(helpers.isFilterValueRange);
    const isAllType = f.type === "all";
    let values;
    if (isAllType || hasRangeInValues || f.values.length === 1) {
        values = f.values.map(removeName).map((v) => ({
            [f.field]: v
        }));
    }
    else {
        // Used for "any" and "none" types that have multiple values and are not ranges
        values = [
            {
                [f.field]: f.values.map(removeName).map((v) => v)
            }
        ];
    }
    return {
        [f.type || "any"]: values
    };
}
function adaptFilters(filters) {
    if (!filters || filters.length === 0)
        return {};
    const all = filters.map(rollup);
    return {
        all
    };
}
function getSort(sortDirection, sortField, sortList) {
    if (sortList && sortList.length) {
        return sortList.map((sortItem) => ({
            [sortItem.field]: sortItem.direction
        }));
    }
    else if (sortField && sortDirection) {
        return {
            [sortField]: sortDirection
        };
    }
    else {
        return undefined;
    }
}
export function adaptRequest(request) {
    const { current, resultsPerPage, searchTerm, sortDirection, sortField, sortList } = request;
    const sort = getSort(sortDirection, sortField, sortList);
    return Object.assign(Object.assign({ query: searchTerm }, (sort !== undefined && { sort })), { page: Object.assign(Object.assign({}, (resultsPerPage !== undefined && { size: resultsPerPage })), (current !== undefined && { current })), filters: adaptFilters(request.filters) });
}
