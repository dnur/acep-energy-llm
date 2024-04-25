"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ErrorBoundary_1 = __importDefault(require("../ErrorBoundary"));
const enzyme_1 = require("enzyme");
const params = {
    children: react_1.default.createElement("div", null, "Child"),
    error: "I am an error"
};
it("renders an error when there is an error", () => {
    const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(ErrorBoundary_1.default, Object.assign({}, params)));
    expect(wrapper).toMatchSnapshot();
});
it("renders children when there is no error", () => {
    const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(ErrorBoundary_1.default, Object.assign({}, Object.assign(Object.assign({}, params), { error: "" }))));
    expect(wrapper).toMatchSnapshot();
});
it("renders with className prop applied", () => {
    const customClassName = "test-class";
    const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(ErrorBoundary_1.default, Object.assign({ className: customClassName }, params)));
    const { className } = wrapper.props();
    expect(className).toEqual("sui-search-error test-class");
});
