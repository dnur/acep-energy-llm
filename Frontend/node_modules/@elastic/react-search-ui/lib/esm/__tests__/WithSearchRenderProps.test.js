import React from "react";
import { mount } from "enzyme";
import { SearchProvider, WithSearch } from "../";
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
        const wrapper = mount(React.createElement(SearchProvider, { config: {
                apiConnector: mockApiConnector,
                initialState: {
                    searchTerm: "test"
                },
                onSearch: () => {
                    return Promise.resolve(mockResponse);
                }
            } },
            React.createElement(WithSearch, { mapContextToProps: ({ searchTerm }) => ({ searchTerm }) }, ({ searchTerm }) => React.createElement("div", null, searchTerm))));
        expect(wrapper.text()).toEqual("test");
    });
    describe("mapContextToProps", () => {
        function setup(mapContextToProps) {
            return mount(React.createElement(SearchProvider, { config: {
                    apiConnector: mockApiConnector,
                    initialState: {
                        resultsPerPage: 90,
                        searchTerm: "test"
                    },
                    onSearch: () => {
                        return Promise.resolve(mockResponse);
                    }
                } },
                React.createElement(WithSearch, { mapContextToProps: mapContextToProps }, ({ searchTerm, resultsPerPage, setResultsPerPage }) => (React.createElement("div", null,
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
