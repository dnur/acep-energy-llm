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
exports.ResultsContainer = void 0;
const react_1 = __importStar(require("react"));
const react_search_ui_views_1 = require("@elastic/react-search-ui-views");
const __1 = require("..");
const _1 = require(".");
function getRaw(result, value) {
    if (!result[value] || !result[value].raw)
        return;
    return result[value].raw;
}
class ResultsContainer extends react_1.Component {
    render() {
        const _a = this.props, { className, clickThroughTags, resultView, results, shouldTrackClickThrough, titleField, urlField, thumbnailField, view } = _a, rest = __rest(_a, ["className", "clickThroughTags", "resultView", "results", "shouldTrackClickThrough", "titleField", "urlField", "thumbnailField", "view"]);
        const View = view || react_search_ui_views_1.Results;
        const ResultView = resultView || react_search_ui_views_1.Result;
        const children = results.map((result) => (react_1.default.createElement(_1.Result, { key: `result-${getRaw(result, "id")}`, titleField: titleField, urlField: urlField, thumbnailField: thumbnailField, view: ResultView, shouldTrackClickThrough: shouldTrackClickThrough, clickThroughTags: clickThroughTags, result: result })));
        const viewProps = Object.assign({ className,
            children }, rest);
        return react_1.default.createElement(View, Object.assign({}, viewProps));
    }
}
exports.ResultsContainer = ResultsContainer;
ResultsContainer.defaultProps = {
    clickThroughTags: [],
    shouldTrackClickThrough: true
};
exports.default = (0, __1.withSearch)(({ results }) => ({ results }))(ResultsContainer);
