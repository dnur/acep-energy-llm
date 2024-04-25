"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const __1 = require("..");
const enzyme_1 = require("enzyme");
const props = {
    autocompleteResults: {
        sectionTitle: "Results",
        titleField: "title",
        urlField: "nps_link",
        linkTarget: "_blank"
    },
    autocompletedResults: [
        {
            id: { raw: "1" },
            title: { snippet: "<em>Bike</em> Cops" }
        },
        {
            id: { raw: "2" },
            title: { snippet: "<em>Biker</em> Gang" }
        },
        {
            id: { raw: "3" },
            title: { snippet: "<em>Biker</em> Bar" }
        }
    ],
    autocompleteSuggestions: {
        documents: {
            sectionTitle: "Suggested"
        },
        popular_queries: {
            sectionTitle: "Popular",
            queryType: "results",
            displayField: "query"
        }
    },
    allAutocompletedItemsCount: 5,
    autocompletedSuggestionsCount: 2,
    autocompletedSuggestions: {
        documents: [
            { highlight: "", suggestion: "bike" },
            { highlight: "", suggestion: "bike police" },
            { highlight: "", suggestion: "bike police go" }
        ],
        popular_queries: [
            {
                result: {
                    query: {
                        raw: "bike police"
                    }
                },
                queryType: "results"
            }
        ]
    },
    getItemProps: (props) => props,
    getMenuProps: (props) => props
};
it("renders correctly", () => {
    const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(__1.Autocomplete, Object.assign({}, props)));
    expect(wrapper).toMatchSnapshot();
});
describe("When there are results", () => {
    it("will render results", () => {
        const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(__1.Autocomplete, Object.assign({}, props, { autocompleteResults: true, autocompleteSuggestions: false })));
        expect(wrapper.find(".sui-search-box__results-list li").length).toEqual(3);
    });
    it("will NOT render results if autocompleteResults is false", () => {
        const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(__1.Autocomplete, Object.assign({}, props, { autocompleteResults: false, autocompleteSuggestions: false })));
        expect(wrapper.find(".sui-search-box__results-list").length).toEqual(0);
    });
    it("will render a results section title if one is provided", () => {
        const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(__1.Autocomplete, Object.assign({}, props, { autocompleteResults: {
                sectionTitle: "Results",
                titleField: "title",
                urlField: "nps_link",
                linkTarget: "_blank"
            }, autocompleteSuggestions: false })));
        expect(wrapper.find(".sui-search-box__section-title").text()).toEqual("Results");
    });
    it("will NOT render a suggestion section title if none is provided", () => {
        const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(__1.Autocomplete, Object.assign({}, props, { autocompleteResults: {
                titleField: "title",
                urlField: "nps_link",
                linkTarget: "_blank"
            }, autocompleteSuggestions: false })));
        expect(wrapper.find(".sui-search-box__section-title").length).toEqual(0);
    });
});
describe("When there are no results", () => {
    it("will NOT render results", () => {
        const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(__1.Autocomplete, Object.assign({}, props, { autocompletedResults: [], autocompleteResults: true, autocompleteSuggestions: false })));
        expect(wrapper.find(".sui-search-box__results-list").length).toEqual(0);
    });
    it("will NOT render a result section title", () => {
        const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(__1.Autocomplete, Object.assign({}, props, { autocompletedResults: [], autocompleteResults: {
                sectionTitle: "Results",
                titleField: "title",
                urlField: "nps_link",
                linkTarget: "_blank"
            }, autocompleteSuggestions: false })));
        expect(wrapper.find(".sui-search-box__section-title").length).toEqual(0);
    });
});
describe("When there are suggestions", () => {
    it("will render suggestions", () => {
        const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(__1.Autocomplete, Object.assign({}, props, { autocompleteResults: false, autocompleteSuggestions: true })));
        expect(wrapper.find(".sui-search-box__suggestion-list li").length).toEqual(4);
    });
    it("will NOT render suggestions if autocompleteSuggestions is false", () => {
        const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(__1.Autocomplete, Object.assign({}, props, { autocompleteResults: false, autocompleteSuggestions: false })));
        expect(wrapper.find(".sui-search-box__suggestion-list").length).toEqual(0);
    });
    it("will render a suggestion section title if one is provided", () => {
        const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(__1.Autocomplete, Object.assign({}, props, { autocompleteResults: false, autocompleteSuggestions: {
                documents: {
                    sectionTitle: "Suggested"
                },
                popular_queries: {
                    queryType: "results",
                    displayField: "query"
                }
            } })));
        expect(wrapper.find(".sui-search-box__section-title").text()).toEqual("Suggested");
    });
    it("will render a suggestion section title for all suggestion types if one is provided without a suggestion type", () => {
        const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(__1.Autocomplete, Object.assign({}, props, { autocompleteResults: false, autocompleteSuggestions: {
                sectionTitle: "Suggested"
            } })));
        expect(wrapper.find(".sui-search-box__section-title").at(0).text()).toEqual("Suggested");
        expect(wrapper.find(".sui-search-box__section-title").at(1).text()).toEqual("Suggested");
    });
    it("will NOT render a suggestion section title if none is provided", () => {
        const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(__1.Autocomplete, Object.assign({}, props, { autocompleteResults: false, autocompleteSuggestions: true })));
        expect(wrapper.find(".sui-search-box__section-title").length).toEqual(0);
    });
});
describe("When there are no suggestions", () => {
    it("will NOT render suggestions", () => {
        const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(__1.Autocomplete, Object.assign({}, props, { autocompleteResults: false, autocompletedSuggestions: {}, autocompleteSuggestions: true })));
        expect(wrapper.find(".sui-search-box__suggestion-list").length).toEqual(0);
    });
    it("will NOT render a suggestion section title", () => {
        const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(__1.Autocomplete, Object.assign({}, props, { autocompleteResults: false, autocompletedSuggestions: {}, autocompleteSuggestions: {
                documents: {
                    sectionTitle: "Suggested"
                }
            } })));
        expect(wrapper.find(".sui-search-box__section-title").length).toEqual(0);
    });
});
it("renders with className prop applied", () => {
    const customClassName = "test-class";
    const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(__1.Autocomplete, Object.assign({ className: customClassName }, props)));
    const { className } = wrapper.props();
    expect(className).toEqual("sui-search-box__autocomplete-container test-class");
});
