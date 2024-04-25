"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Results_1 = __importDefault(require("../Results"));
const enzyme_1 = require("enzyme");
it("renders correctly", () => {
    const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(Results_1.default, null,
        react_1.default.createElement("div", null, "Children")));
    expect(wrapper).toMatchSnapshot();
});
it("renders with className prop applied", () => {
    const customClassName = "test-class";
    const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(Results_1.default, { className: customClassName },
        react_1.default.createElement("div", null, "Children")));
    const { className } = wrapper.props();
    expect(className).toEqual("sui-results-container test-class");
});
