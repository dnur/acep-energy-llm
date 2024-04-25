"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const BooleanFacet_1 = __importDefault(require("../BooleanFacet"));
const enzyme_1 = require("enzyme");
const params = {
    label: "A Facet",
    onRemove: jest.fn(),
    onChange: jest.fn(),
    onMoreClick: jest.fn(),
    onSearch: jest.fn(),
    onSelect: jest.fn(),
    searchPlaceholder: "Search",
    showMore: false,
    showSearch: false,
    options: [
        {
            value: "true",
            count: 10
        }
    ],
    values: []
};
it("renders", () => {
    const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(BooleanFacet_1.default, Object.assign({}, params)));
    expect(wrapper).toMatchSnapshot();
});
it("renders with className prop applied", () => {
    const customClassName = "test-class";
    const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(BooleanFacet_1.default, Object.assign({ className: customClassName }, params)));
    const { className } = wrapper.props();
    expect(className.includes(customClassName)).toBe(true);
});
it("onChange is called on click", () => {
    const wrapper = (0, enzyme_1.mount)(react_1.default.createElement(BooleanFacet_1.default, Object.assign({}, params)));
    wrapper.find("input").simulate("change");
    expect(params.onChange).toHaveBeenCalledTimes(1);
});
it("onRemove is called on click", () => {
    const wrapper = (0, enzyme_1.mount)(react_1.default.createElement(BooleanFacet_1.default, Object.assign({}, Object.assign(Object.assign({}, params), { values: ["true"] }))));
    wrapper.find("input").simulate("change");
    expect(params.onRemove).toHaveBeenCalledTimes(1);
});
it("will not render when there are no true options", () => {
    params.options = [];
    const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(BooleanFacet_1.default, Object.assign({}, params)));
    expect(wrapper).toMatchSnapshot();
});
