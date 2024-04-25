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
const view_helpers_1 = require("./view-helpers");
function Result(_a) {
    var { className, result, onClickLink, titleField, urlField, thumbnailField } = _a, rest = __rest(_a, ["className", "result", "onClickLink", "titleField", "urlField", "thumbnailField"]);
    const fields = (0, view_helpers_1.formatResult)(result);
    const title = (0, view_helpers_1.getEscapedField)(result[titleField]);
    const url = (0, view_helpers_1.getUrlSanitizer)(URL, location.href)((0, view_helpers_1.getRaw)(result[urlField]));
    const thumbnail = (0, view_helpers_1.getUrlSanitizer)(URL, location.href)((0, view_helpers_1.getRaw)(result[thumbnailField]));
    return (react_1.default.createElement("li", Object.assign({ className: (0, view_helpers_1.appendClassName)("sui-result", className) }, rest),
        react_1.default.createElement("div", { className: "sui-result__header" },
            title && !url && (react_1.default.createElement("span", { className: "sui-result__title", dangerouslySetInnerHTML: { __html: title } })),
            title && url && (react_1.default.createElement("a", { className: "sui-result__title sui-result__title-link", dangerouslySetInnerHTML: { __html: title }, href: url, onClick: onClickLink, target: "_blank", rel: "noopener noreferrer" }))),
        react_1.default.createElement("div", { className: "sui-result__body" },
            thumbnail && (react_1.default.createElement("div", { className: "sui-result__image" },
                react_1.default.createElement("img", { src: thumbnail, alt: "" }))),
            react_1.default.createElement("ul", { className: "sui-result__details" }, Object.entries(fields).map(([fieldName, fieldValue]) => (react_1.default.createElement("li", { key: fieldName },
                react_1.default.createElement("span", { className: "sui-result__key" }, fieldName),
                " ",
                react_1.default.createElement("span", { className: "sui-result__value", dangerouslySetInnerHTML: { __html: fieldValue } }))))))));
}
exports.default = Result;
