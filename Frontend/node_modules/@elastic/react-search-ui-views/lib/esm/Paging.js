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
import RCPagination from "rc-pagination";
import enUsLocale from "rc-pagination/lib/locale/en_US";
import { appendClassName } from "./view-helpers";
function Paging(_a) {
    var { className, current, resultsPerPage, onChange, totalPages } = _a, rest = __rest(_a, ["className", "current", "resultsPerPage", "onChange", "totalPages"]);
    return (React.createElement(RCPagination, Object.assign({ current: current, onChange: onChange, pageSize: resultsPerPage, total: totalPages * resultsPerPage, className: appendClassName("sui-paging", className), locale: enUsLocale }, rest)));
}
export default Paging;
