"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getNewClassName(newClassName) {
    if (!Array.isArray(newClassName))
        return newClassName;
    return newClassName.filter((name) => name).join(" ");
}
function appendClassName(baseClassName, newClassName) {
    if (!newClassName)
        return ((Array.isArray(baseClassName)
            ? baseClassName.join(" ")
            : baseClassName) || "");
    if (!baseClassName)
        return getNewClassName(newClassName) || "";
    return `${baseClassName} ${getNewClassName(newClassName)}`;
}
exports.default = appendClassName;
