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
const react_1 = __importDefault(require("react"));
const rc_pagination_1 = __importDefault(require("rc-pagination"));
const en_US_1 = __importDefault(require("rc-pagination/lib/locale/en_US"));
const view_helpers_1 = require("./view-helpers");
function Paging(_a) {
    var { className, current, resultsPerPage, onChange, totalPages } = _a, rest = __rest(_a, ["className", "current", "resultsPerPage", "onChange", "totalPages"]);
    return (react_1.default.createElement(rc_pagination_1.default, Object.assign({ current: current, onChange: onChange, pageSize: resultsPerPage, total: totalPages * resultsPerPage, className: (0, view_helpers_1.appendClassName)("sui-paging", className), locale: en_US_1.default }, rest)));
}
exports.default = Paging;
