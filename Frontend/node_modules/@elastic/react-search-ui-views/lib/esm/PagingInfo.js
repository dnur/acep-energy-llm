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
import { appendClassName } from "./view-helpers";
function PagingInfo(_a) {
    var { className, end, searchTerm, start, totalResults } = _a, rest = __rest(_a, ["className", "end", "searchTerm", "start", "totalResults"]);
    return (React.createElement("div", Object.assign({ className: appendClassName("sui-paging-info", className) }, rest),
        "Showing",
        " ",
        React.createElement("strong", null,
            start,
            " - ",
            end),
        " ",
        "out of ",
        React.createElement("strong", null, totalResults),
        searchTerm && (React.createElement(React.Fragment, null,
            " ",
            "for: ",
            React.createElement("em", null, searchTerm)))));
}
export default PagingInfo;
