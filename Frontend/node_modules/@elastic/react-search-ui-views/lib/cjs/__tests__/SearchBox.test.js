"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const SearchBox_1 = __importDefault(require("../SearchBox"));
const SearchInput_1 = __importDefault(require("../SearchInput"));
const enzyme_1 = require("enzyme");
const requiredProps = {
    completeSuggestion: () => ({}),
    onChange: () => ({}),
    onSubmit: () => ({}),
    allAutocompletedItemsCount: 0,
    autocompletedResults: [],
    autocompletedSuggestions: {},
    autocompletedSuggestionsCount: 0,
    notifyAutocompleteSelected: () => ({}),
    value: "test",
    inputProps: {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onFocus: () => { },
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onBlur: () => { }
    },
    isFocused: false,
    onSelectAutocomplete: jest.fn(),
    useAutocomplete: true
};
it("renders correctly", () => {
    const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(SearchBox_1.default, Object.assign({}, requiredProps)));
    expect(wrapper).toMatchSnapshot();
});
it("renders correctly with single autocompleteSuggestion configuration", () => {
    const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(SearchBox_1.default, Object.assign({}, requiredProps, { autocompleteSuggestions: { sectionTitle: "test" } })));
    expect(wrapper).toMatchSnapshot();
});
it("applies 'focused' class when `isFocused` is true", () => {
    const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(SearchBox_1.default, Object.assign({}, requiredProps, { isFocused: true })));
    const downshift = wrapper
        .find("Downshift")
        .dive()
        .find("SearchInput")
        .shallow();
    const input = downshift.find(".sui-search-box__text-input");
    expect(input.hasClass("focus")).toBe(true);
});
it("passes through downshiftProps", () => {
    const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(SearchBox_1.default, Object.assign({}, requiredProps, { inputProps: {
            placeholder: "test",
            onBlur: jest.fn(),
            onFocus: jest.fn()
        } })));
    const si = wrapper.find("Downshift").dive().find(SearchInput_1.default);
    expect(si.props().clearSelection).toBeInstanceOf(Function);
});
it("passes through inputProps", () => {
    const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(SearchBox_1.default, Object.assign({}, requiredProps, { inputProps: { placeholder: "test" } })));
    const downshift = wrapper.dive().find("SearchInput").shallow();
    const input = downshift.find(".sui-search-box__text-input");
    expect(input.props().placeholder).toBe("test");
});
it("renders with className prop applied", () => {
    const customClassName = "test-class";
    const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(SearchBox_1.default, Object.assign({}, requiredProps, { className: customClassName })));
    const { className } = wrapper.dive().find(".sui-search-box").props();
    expect(className).toEqual("sui-search-box test-class");
});
it("applies className from inputProps to input element", () => {
    const customClassName = "test-class";
    const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(SearchBox_1.default, Object.assign({}, requiredProps, { inputProps: { className: customClassName } })));
    const downshift = wrapper.dive().find("SearchInput").shallow();
    const input = downshift.find(".sui-search-box__text-input");
    expect(input.props().className).toBe("sui-search-box__text-input test-class");
});
describe("inputView prop", () => {
    let wrapper, input, button;
    function setup() {
        wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(SearchBox_1.default, Object.assign({}, requiredProps, { inputView: ({ getAutocomplete, getInputProps, getButtonProps }) => {
                return (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement("div", { className: "some_custom_wrapper_class" },
                        react_1.default.createElement("input", Object.assign({}, getInputProps({
                            className: "some_custom_input_class"
                        }))),
                        getAutocomplete(),
                        react_1.default.createElement("input", Object.assign({}, getButtonProps({
                            className: "some_custom_button_class"
                        }))))));
            } })));
        input = wrapper.dive().find("inputView").shallow().find("input").at(0);
        button = wrapper.dive().find("inputView").shallow().find("input").at(1);
    }
    it("will render a custom view just for the input section", () => {
        setup();
        expect(wrapper
            .dive("Downshift")
            .find("inputView")
            .shallow()
            .find(".some_custom_wrapper_class")).toHaveLength(1);
    });
    describe("when getInputProps is used", () => {
        it("will render custom props on input", () => {
            setup();
            expect(input.hasClass("some_custom_input_class")).toBe(true);
        });
        it("will not overwrite the base class on input", () => {
            setup();
            expect(input.hasClass("sui-search-box__text-input")).toBe(true);
        });
        it("will render base props on input", () => {
            setup();
            expect(input.props().placeholder).toBe("Search");
        });
    });
    describe("when getButtonProps is used", () => {
        it("will render custom props on button", () => {
            setup();
            expect(button.hasClass("some_custom_button_class")).toBe(true);
        });
        it("will not overwrite the base class on button", () => {
            setup();
            expect(button.hasClass("sui-search-box__submit")).toBe(true);
        });
        it("will render base props on button", () => {
            setup();
            expect(button.props().type).toBe("submit");
        });
    });
});
