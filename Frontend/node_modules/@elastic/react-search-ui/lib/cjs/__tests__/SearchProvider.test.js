"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const __1 = require("../");
const search_ui_1 = require("@elastic/search-ui");
function getMocks() {
    const mockApiConnector = {
        onSearch: jest.fn(),
        onAutocomplete: jest.fn(),
        onResultClick: jest.fn(),
        onAutocompleteResultClick: jest.fn()
    };
    const driver = new search_ui_1.SearchDriver({
        apiConnector: mockApiConnector
    });
    const mockedDriver = Object.assign(driver, {
        tearDown: jest.fn(),
        setSearchQuery: jest.fn(),
        setAutocompleteQuery: jest.fn()
    });
    return {
        apiConnector: mockApiConnector,
        driver: mockedDriver
    };
}
describe("SearchProvider", () => {
    it("will clean up searchDriver on unmount", () => {
        const { driver, apiConnector } = getMocks();
        const wrapper = (0, enzyme_1.mount)(react_1.default.createElement(__1.SearchProvider, { driver: driver, config: { apiConnector } },
            react_1.default.createElement("div", null)));
        expect(driver.tearDown).not.toHaveBeenCalled();
        wrapper.unmount();
        expect(driver.tearDown).toHaveBeenCalled();
    });
    it("will update searchDriver when searchQuery config changes", () => {
        const originalSearchQueryConfig = {
            facets: { states: { type: "value", size: 30 } }
        };
        const updatedSearchQueryConfig = {};
        const { driver, apiConnector } = getMocks();
        const wrapper = (0, enzyme_1.mount)(react_1.default.createElement(__1.SearchProvider, { driver: driver, config: {
                apiConnector: apiConnector,
                searchQuery: originalSearchQueryConfig
            } },
            react_1.default.createElement("div", null, "test")));
        expect(driver.setSearchQuery).not.toHaveBeenCalled();
        wrapper.setProps({
            driver,
            config: { searchQuery: updatedSearchQueryConfig }
        });
        expect(driver.setSearchQuery).toHaveBeenCalledWith(updatedSearchQueryConfig);
        expect(driver.setAutocompleteQuery).not.toHaveBeenCalled();
    });
    it("will update searchDriver when autocompleteQuery config changes", () => {
        const autocompleteQueryConfig = {
            results: { result_fields: { states: { snippet: { size: 30 } } } }
        };
        const updatedAutocompleteQueryConfig = {};
        const { driver, apiConnector } = getMocks();
        const wrapper = (0, enzyme_1.mount)(react_1.default.createElement(__1.SearchProvider, { driver: driver, config: {
                apiConnector: apiConnector,
                autocompleteQuery: autocompleteQueryConfig
            } },
            react_1.default.createElement("div", null, "test")));
        expect(driver.setAutocompleteQuery).not.toHaveBeenCalled();
        wrapper.setProps({
            driver,
            config: { autocompleteQuery: updatedAutocompleteQueryConfig }
        });
        expect(driver.setAutocompleteQuery).toHaveBeenCalledWith(updatedAutocompleteQueryConfig);
        expect(driver.setSearchQuery).not.toHaveBeenCalled();
    });
    it("exposes state and actions to components", () => {
        const { apiConnector } = getMocks();
        const wrapper = (0, enzyme_1.mount)(react_1.default.createElement(__1.SearchProvider, { config: {
                apiConnector: apiConnector,
                initialState: {
                    searchTerm: "test"
                },
                onSearch: () => {
                    return Promise.resolve({
                        results: [],
                        facets: {},
                        pagingStart: 0,
                        pagingEnd: 100,
                        rawResponse: {},
                        requestId: "1",
                        resultSearchTerm: "test",
                        totalPages: 100,
                        totalResults: 1000,
                        wasSearched: true
                    });
                }
            } },
            react_1.default.createElement(__1.WithSearch, { mapContextToProps: ({ searchTerm, setSearchTerm }) => ({
                    searchTerm,
                    setSearchTerm
                }) }, ({ searchTerm, setSearchTerm }) => (react_1.default.createElement("div", null,
                searchTerm,
                typeof setSearchTerm)))));
        expect(wrapper.text()).toEqual("testfunction");
    });
});
