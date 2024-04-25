function getNewClassName(newClassName) {
    if (!Array.isArray(newClassName))
        return newClassName;
    return newClassName.filter((name) => name).join(" ");
}
export default function appendClassName(baseClassName, newClassName) {
    if (!newClassName)
        return ((Array.isArray(baseClassName)
            ? baseClassName.join(" ")
            : baseClassName) || "");
    if (!baseClassName)
        return getNewClassName(newClassName) || "";
    return `${baseClassName} ${getNewClassName(newClassName)}`;
}
