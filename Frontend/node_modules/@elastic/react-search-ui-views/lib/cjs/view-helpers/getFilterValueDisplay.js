"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Since Filter Values come in many different varieties, this helper
encapsulates the logic for determining how to show the label of that
filter in the UI.
*/
function getFilterValueDisplay(filterValue) {
    if (filterValue === undefined || filterValue === null)
        return "";
    if (Object.prototype.hasOwnProperty.call(filterValue, "name"))
        return filterValue.name;
    return String(filterValue);
}
exports.default = getFilterValueDisplay;
