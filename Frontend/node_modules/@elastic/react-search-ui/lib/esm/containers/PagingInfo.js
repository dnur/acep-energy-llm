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
import { PagingInfo } from "@elastic/react-search-ui-views";
export class PagingInfoContainer extends Component {
    render() {
        const _a = this.props, { className, pagingStart, pagingEnd, resultSearchTerm, totalResults, view } = _a, rest = __rest(_a, ["className", "pagingStart", "pagingEnd", "resultSearchTerm", "totalResults", "view"]);
        const View = view || PagingInfo;
        const viewProps = Object.assign({ className, searchTerm: resultSearchTerm, start: pagingStart, end: pagingEnd, totalResults: totalResults }, rest);
        return React.createElement(View, Object.assign({}, viewProps));
    }
}
export default withSearch(({ pagingStart, pagingEnd, resultSearchTerm, totalResults }) => ({
    pagingStart,
    pagingEnd,
    resultSearchTerm,
    totalResults
}))(PagingInfoContainer);
