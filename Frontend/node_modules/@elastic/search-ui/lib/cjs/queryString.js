"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const qs_1 = __importDefault(require("qs"));
const preserveTypesEncoder_1 = __importDefault(require("./preserveTypesEncoder"));
exports.default = {
    parse(string) {
        return qs_1.default.parse(string, {
            ignoreQueryPrefix: true,
            decoder: preserveTypesEncoder_1.default.decode,
            arrayLimit: 1000
        });
    },
    stringify(object) {
        return qs_1.default.stringify(object, {
            encoder: preserveTypesEncoder_1.default.encode
        });
    }
};
