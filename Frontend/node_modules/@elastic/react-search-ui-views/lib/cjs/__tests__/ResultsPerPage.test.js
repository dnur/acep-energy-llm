"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ResultsPerPage_1 = __importDefault(require("../ResultsPerPage"));
const enzyme_1 = require("enzyme");
const requiredProps = {
    onChange: () => ({}),
    options: [20, 40]
};
it("renders correctly when there is a selected value", () => {
    const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(ResultsPerPage_1.default, Object.assign({}, requiredProps, { value: 40 })));
    expect(wrapper).toMatchSnapshot();
});
it("renders correctly when there is not a selected value", () => {
    const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(ResultsPerPage_1.default, Object.assign({}, requiredProps)));
    expect(wrapper).toMatchSnapshot();
});
it("renders with className prop applied", () => {
    const customClassName = "test-class";
    const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(ResultsPerPage_1.default, Object.assign({}, requiredProps, { className: customClassName })));
    const { className } = wrapper.props();
    expect(className).toEqual("sui-results-per-page test-class");
});
