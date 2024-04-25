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
import { Result, Results } from "@elastic/react-search-ui-views";
import { withSearch } from "..";
import { Result as ResultContainer } from ".";
function getRaw(result, value) {
    if (!result[value] || !result[value].raw)
        return;
    return result[value].raw;
}
export class ResultsContainer extends Component {
    render() {
        const _a = this.props, { className, clickThroughTags, resultView, results, shouldTrackClickThrough, titleField, urlField, thumbnailField, view } = _a, rest = __rest(_a, ["className", "clickThroughTags", "resultView", "results", "shouldTrackClickThrough", "titleField", "urlField", "thumbnailField", "view"]);
        const View = view || Results;
        const ResultView = resultView || Result;
        const children = results.map((result) => (React.createElement(ResultContainer, { key: `result-${getRaw(result, "id")}`, titleField: titleField, urlField: urlField, thumbnailField: thumbnailField, view: ResultView, shouldTrackClickThrough: shouldTrackClickThrough, clickThroughTags: clickThroughTags, result: result })));
        const viewProps = Object.assign({ className,
            children }, rest);
        return React.createElement(View, Object.assign({}, viewProps));
    }
}
ResultsContainer.defaultProps = {
    clickThroughTags: [],
    shouldTrackClickThrough: true
};
export default withSearch(({ results }) => ({ results }))(ResultsContainer);
