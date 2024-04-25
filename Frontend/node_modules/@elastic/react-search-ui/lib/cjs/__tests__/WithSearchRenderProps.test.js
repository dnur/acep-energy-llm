"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const __1 = require("../");
describe("WithSearch", () => {
    const mockResponse = {
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
    };
    const mockApiConnector = {
        onSearch: jest.fn(),
        onAutocomplete: jest.fn(),
        onResultClick: jest.fn(),
        onAutocompleteResultClick: jest.fn()
    };
    it("exposes state and actions to components", () => {
        const wrapper = (0, enzyme_1.mount)(react_1.default.createElement(__1.SearchProvider, { config: {
                apiConnector: mockApiConnector,
                initialState: {
                    searchTerm: "test"
                },
                onSearch: () => {
                    return Promise.resolve(mockResponse);
                }
            } },
            react_1.default.createElement(__1.WithSearch, { mapContextToProps: ({ searchTerm }) => ({ searchTerm }) }, ({ searchTerm }) => react_1.default.createElement("div", null, searchTerm))));
        expect(wrapper.text()).toEqual("test");
    });
    describe("mapContextToProps", () => {
        function setup(mapContextToProps) {
            return (0, enzyme_1.mount)(react_1.default.createElement(__1.SearchProvider, { config: {
                    apiConnector: mockApiConnector,
                    initialState: {
                        resultsPerPage: 90,
                        searchTerm: "test"
                    },
                    onSearch: () => {
                        return Promise.resolve(mockResponse);
                    }
                } },
                react_1.default.createElement(__1.WithSearch, { mapContextToProps: mapContextToProps }, ({ searchTerm, resultsPerPage, setResultsPerPage }) => (react_1.default.createElement("div", null,
                    searchTerm,
                    resultsPerPage,
                    setResultsPerPage && typeof setResultsPerPage)))));
        }
        it("can inject state", () => {
            const mapContextToProps = ({ resultsPerPage }) => ({
                resultsPerPage
            });
            const wrapper = setup(mapContextToProps);
            expect(wrapper.text()).toEqual("90");
        });
        it("can inject actions", () => {
            const mapContextToProps = ({ setResultsPerPage }) => ({
                setResultsPerPage
            });
            const wrapper = setup(mapContextToProps);
            expect(wrapper.text()).toEqual("function");
        });
    });
});
