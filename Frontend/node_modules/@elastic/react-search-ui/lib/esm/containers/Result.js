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
import { Component } from "react";
import { Result } from "@elastic/react-search-ui-views";
import { withSearch } from "..";
export class ResultContainer extends Component {
    constructor() {
        super(...arguments);
        this.handleClickLink = (id) => {
            const { clickThroughTags, shouldTrackClickThrough, trackClickThrough } = this.props;
            if (shouldTrackClickThrough) {
                trackClickThrough(id, clickThroughTags);
            }
        };
    }
    render() {
        const _a = this.props, { className, result, titleField, urlField, thumbnailField, view, 
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        trackClickThrough, 
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        shouldTrackClickThrough, 
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        clickThroughTags } = _a, rest = __rest(_a, ["className", "result", "titleField", "urlField", "thumbnailField", "view", "trackClickThrough", "shouldTrackClickThrough", "clickThroughTags"]);
        const View = view || Result;
        const id = result.id.raw;
        const viewProps = Object.assign({ className, result: result, key: `result-${id}`, onClickLink: () => this.handleClickLink(id), titleField,
            urlField,
            thumbnailField }, rest);
        return React.createElement(View, Object.assign({}, viewProps));
    }
}
ResultContainer.defaultProps = {
    clickThroughTags: [],
    shouldTrackClickThrough: true
};
export default withSearch(({ trackClickThrough }) => ({ trackClickThrough }))(ResultContainer);
