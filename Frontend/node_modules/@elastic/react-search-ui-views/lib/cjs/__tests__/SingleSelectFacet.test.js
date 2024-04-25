"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const SingleSelectFacet_1 = __importDefault(require("../SingleSelectFacet"));
const enzyme_1 = require("enzyme");
const params = {
    label: "A Facet",
    onChange: jest.fn(),
    onRemove: jest.fn(),
    onMoreClick: jest.fn(),
    onSearch: jest.fn(),
    onSelect: jest.fn(),
    searchPlaceholder: "Search",
    showMore: false,
    showSearch: false,
    values: [],
    options: [
        {
            count: 20,
            value: {
                from: 1,
                to: 10,
                name: "Range 1"
            },
            selected: true
        },
        {
            count: 10,
            value: {
                to: 20,
                from: 11,
                name: "Range 2"
            },
            selected: false
        }
    ]
};
it("renders", () => {
    const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(SingleSelectFacet_1.default, Object.assign({}, params)));
    expect(wrapper).toMatchSnapshot();
});
it("renders falsey values correctly", () => {
    const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(SingleSelectFacet_1.default, Object.assign({}, params, { options: [
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
        const wrapper = (0, enzyme_1.render)(react_1.default.createElement(SingleSelectFacet_1.default, Object.assign({}, params)));
        expect(wrapper.find(".sui-select__single-value").text()).toEqual("Range 1");
    });
    // This shouldn't ever happen, but if it does, it should use the first selected value
    it("will used the first selected option when multiple options are selected", () => {
        const wrapper = (0, enzyme_1.render)(react_1.default.createElement(SingleSelectFacet_1.default, Object.assign({}, params, { options: params.options.map((o) => (Object.assign(Object.assign({}, o), { selected: true }))) })));
        expect(wrapper.find(".sui-select__single-value").text()).toEqual("Range 1");
    });
    it("will correctly determine when no value is selected", () => {
        const wrapper = (0, enzyme_1.render)(react_1.default.createElement(SingleSelectFacet_1.default, Object.assign({}, params, { options: params.options.map((o) => (Object.assign(Object.assign({}, o), { selected: false }))) })));
        expect(wrapper.find(".sui-select__single-value").text()).toEqual("");
    });
});
it("renders with className prop applied", () => {
    const customClassName = "test-class";
    const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(SingleSelectFacet_1.default, Object.assign({}, params, { className: customClassName })));
    const { className } = wrapper.props();
    expect(className).toEqual("sui-facet test-class");
});
