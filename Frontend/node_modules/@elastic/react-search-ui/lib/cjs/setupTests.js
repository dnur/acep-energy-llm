"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// setup file
const enzyme_1 = require("enzyme");
const enzyme_adapter_react_17_1 = __importDefault(require("@wojtekmaj/enzyme-adapter-react-17"));
(0, enzyme_1.configure)({ adapter: new enzyme_adapter_react_17_1.default() });
