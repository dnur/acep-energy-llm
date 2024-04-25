"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultContainer = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const react_search_ui_views_1 = require("@elastic/react-search-ui-views");
const __1 = require("..");
class ResultContainer extends react_2.Component {
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
        const View = view || react_search_ui_views_1.Result;
        const id = result.id.raw;
        const viewProps = Object.assign({ className, result: result, key: `result-${id}`, onClickLink: () => this.handleClickLink(id), titleField,
            urlField,
            thumbnailField }, rest);
        return react_1.default.createElement(View, Object.assign({}, viewProps));
    }
}
exports.ResultContainer = ResultContainer;
ResultContainer.defaultProps = {
    clickThroughTags: [],
    shouldTrackClickThrough: true
};
exports.default = (0, __1.withSearch)(({ trackClickThrough }) => ({ trackClickThrough }))(ResultContainer);
