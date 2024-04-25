"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Paging_1 = __importDefault(require("../Paging"));
const enzyme_1 = require("enzyme");
const params = {
    current: 1,
    onChange: () => ({}),
    resultsPerPage: 10,
    totalPages: 100
};
it("renders correctly", () => {
    const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(Paging_1.default, Object.assign({}, params)));
    expect(wrapper).toMatchSnapshot();
});
it("renders with className prop applied", () => {
    const customClassName = "test-class";
    const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(Paging_1.default, Object.assign({ className: customClassName }, params)));
    const { className } = wrapper.dive().props();
    expect(className).toEqual("rc-pagination sui-paging test-class");
});
