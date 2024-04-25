"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accentFold = void 0;
// LÒpez => Lopez
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
const accentFold = (str) => typeof str === "string"
    ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    : "";
exports.accentFold = accentFold;
