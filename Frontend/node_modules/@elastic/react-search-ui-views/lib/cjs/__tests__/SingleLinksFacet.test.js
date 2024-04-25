"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const SingleLinksFacet_1 = __importDefault(require("../SingleLinksFacet"));
const enzyme_1 = require("enzyme");
const params = {
    label: "Facet",
    onRemove: jest.fn(),
    onSelect: jest.fn(),
    options: [
        { value: "1", count: 1, selected: false },
        { value: "2", count: 1, selected: false }
    ],
    onChange: jest.fn(),
    onMoreClick: jest.fn(),
    onSearch: jest.fn(),
    searchPlaceholder: "Search",
    showMore: false,
    showSearch: false,
    values: []
};
it("renders correctly", () => {
    const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(SingleLinksFacet_1.default, Object.assign({}, params)));
    expect(wrapper).toMatchSnapshot();
});
it("renders falsey values correctly", () => {
    const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(SingleLinksFacet_1.default, Object.assign({}, params, { options: [
            {
                value: 0,
                count: 10,
                selected: false
            },
            {
                value: false,
                count: 20,
                selected: false
            },
            {
                value: "",
                count: 30,
                selected: false
            }
        ] })));
    expect(wrapper).toMatchSnapshot();
});
describe("determining selected option", () => {
    it("will correctly determine which of the options is selected", () => {
        const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(SingleLinksFacet_1.default, Object.assign({}, params, { options: [
                { value: "1", count: 1, selected: true },
                { value: "2", count: 1, selected: false }
            ] })));
        expect(wrapper.find("li").length).toBe(1);
        expect(wrapper.find("li").text()).toBe("1 (Remove)");
    });
    // This shouldn't ever happen, but if it does, it should use the first selected value
    it("will used the first selected option when multiple options are selected", () => {
        const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(SingleLinksFacet_1.default, Object.assign({}, params, { options: [
                { value: "1", count: 1, selected: true },
                { value: "2", count: 1, selected: true }
            ] })));
        expect(wrapper.find("li").length).toBe(1);
        expect(wrapper.find("li").text()).toBe("1 (Remove)");
    });
    it("will correctly determine when no value is selected", () => {
        const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(SingleLinksFacet_1.default, Object.assign({}, params, { options: [
                { value: "1", count: 1, selected: false },
                { value: "2", count: 1, selected: false }
            ] })));
        expect(wrapper.find("li").length).toBe(2);
    });
});
it("renders with className prop applied", () => {
    const customClassName = "test-class";
    const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(SingleLinksFacet_1.default, Object.assign({}, params, { className: customClassName })));
    const { className } = wrapper.props();
    expect(className).toEqual("sui-facet test-class");
});
