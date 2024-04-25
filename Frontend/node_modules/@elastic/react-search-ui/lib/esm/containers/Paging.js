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
import { withSearch } from "..";
import { Paging } from "@elastic/react-search-ui-views";
export function PagingContainer(_a) {
    var { className, current, resultsPerPage, setCurrent, totalPages, view } = _a, rest = __rest(_a, ["className", "current", "resultsPerPage", "setCurrent", "totalPages", "view"]);
    if (totalPages === 0)
        return null;
    const View = view || Paging;
    const viewProps = Object.assign({ className,
        current,
        resultsPerPage,
        totalPages, onChange: setCurrent }, rest);
    return React.createElement(View, Object.assign({}, viewProps));
}
export default withSearch(({ current, resultsPerPage, totalPages, setCurrent }) => ({
    current,
    resultsPerPage,
    totalPages,
    setCurrent
}))(PagingContainer);
