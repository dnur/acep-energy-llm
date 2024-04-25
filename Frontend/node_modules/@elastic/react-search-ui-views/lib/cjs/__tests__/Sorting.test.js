"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Sorting_1 = __importDefault(require("../Sorting"));
const enzyme_1 = require("enzyme");
const requiredProps = {
    onChange: jest.fn(),
    options: [
        { label: "Name ASC", value: "name|||asc" },
        { label: "Name DESC", value: "name|||desc" }
    ],
    value: "name|||asc"
};
it("renders correctly when there is a value", () => {
    const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(Sorting_1.default, Object.assign({}, requiredProps, { value: "name|||desc" })));
    expect(wrapper).toMatchSnapshot();
});
it("renders correctly when there is not a value", () => {
    const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(Sorting_1.default, Object.assign({}, requiredProps)));
    expect(wrapper).toMatchSnapshot();
});
it("renders with className prop applied", () => {
    const customClassName = "test-class";
    const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(Sorting_1.default, Object.assign({}, requiredProps, { className: customClassName })));
    const { className } = wrapper.props();
    expect(className).toEqual("sui-sorting test-class");
});
