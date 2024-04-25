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
exports.PagingContainer = void 0;
const react_1 = __importDefault(require("react"));
const __1 = require("..");
const react_search_ui_views_1 = require("@elastic/react-search-ui-views");
function PagingContainer(_a) {
    var { className, current, resultsPerPage, setCurrent, totalPages, view } = _a, rest = __rest(_a, ["className", "current", "resultsPerPage", "setCurrent", "totalPages", "view"]);
    if (totalPages === 0)
        return null;
    const View = view || react_search_ui_views_1.Paging;
    const viewProps = Object.assign({ className,
        current,
        resultsPerPage,
        totalPages, onChange: setCurrent }, rest);
    return react_1.default.createElement(View, Object.assign({}, viewProps));
}
exports.PagingContainer = PagingContainer;
exports.default = (0, __1.withSearch)(({ current, resultsPerPage, totalPages, setCurrent }) => ({
    current,
    resultsPerPage,
    totalPages,
    setCurrent
}))(PagingContainer);
