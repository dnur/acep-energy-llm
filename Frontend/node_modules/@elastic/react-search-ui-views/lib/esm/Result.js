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
import { appendClassName, getUrlSanitizer, formatResult, getEscapedField, getRaw } from "./view-helpers";
function Result(_a) {
    var { className, result, onClickLink, titleField, urlField, thumbnailField } = _a, rest = __rest(_a, ["className", "result", "onClickLink", "titleField", "urlField", "thumbnailField"]);
    const fields = formatResult(result);
    const title = getEscapedField(result[titleField]);
    const url = getUrlSanitizer(URL, location.href)(getRaw(result[urlField]));
    const thumbnail = getUrlSanitizer(URL, location.href)(getRaw(result[thumbnailField]));
    return (React.createElement("li", Object.assign({ className: appendClassName("sui-result", className) }, rest),
        React.createElement("div", { className: "sui-result__header" },
            title && !url && (React.createElement("span", { className: "sui-result__title", dangerouslySetInnerHTML: { __html: title } })),
            title && url && (React.createElement("a", { className: "sui-result__title sui-result__title-link", dangerouslySetInnerHTML: { __html: title }, href: url, onClick: onClickLink, target: "_blank", rel: "noopener noreferrer" }))),
        React.createElement("div", { className: "sui-result__body" },
            thumbnail && (React.createElement("div", { className: "sui-result__image" },
                React.createElement("img", { src: thumbnail, alt: "" }))),
            React.createElement("ul", { className: "sui-result__details" }, Object.entries(fields).map(([fieldName, fieldValue]) => (React.createElement("li", { key: fieldName },
                React.createElement("span", { className: "sui-result__key" }, fieldName),
                " ",
                React.createElement("span", { className: "sui-result__value", dangerouslySetInnerHTML: { __html: fieldValue } }))))))));
}
export default Result;
