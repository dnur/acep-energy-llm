var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as ElasticAppSearch from "@elastic/app-search-javascript";
import AppSearchAPIConnector from "..";
import { DEFAULT_STATE } from "@elastic/search-ui";
jest.mock("@elastic/app-search-javascript");
const resultsSuggestions = {
    results: {
        documents: [
            {
                suggestion: "carlsbad"
            },
            {
                suggestion: "carlsbad caverns"
            },
            {
                suggestion: "carolina"
            }
        ]
    },
    meta: {
        request_id: "914f909793379ed5af9379b4401f19be"
    }
};
const resultList = {
    info: {
        facets: {},
        meta: {
            page: {
                total_results: 1000
            },
            request_id: "12345"
        }
    },
    rawResults: [{}, {}]
};
const mockClient = {
    search: jest.fn().mockReturnValue({ then: (cb) => cb(resultList) }),
    querySuggestion: jest
        .fn()
        .mockReturnValue({ then: (cb) => cb(resultsSuggestions) }),
    click: jest.fn().mockReturnValue(Promise.resolve())
};
ElasticAppSearch.createClient.mockReturnValue(mockClient);
const resultState = {
    facets: {},
    rawResponse: {
        info: {
            facets: {},
            meta: {
                page: {
                    total_results: 1000
                },
                request_id: "12345"
            }
        },
        rawResults: [{}, {}]
    },
    results: [{}, {}],
    totalResults: 1000,
    requestId: "12345"
};
const params = {
    engineName: "some-engine",
    hostIdentifier: "host-XXXX",
    searchKey: "search-XXXXX",
    cacheResponses: true
};
beforeEach(() => {
    mockClient.search = jest
        .fn()
        .mockReturnValue({ then: (cb) => cb(resultList) });
    mockClient.querySuggestion = jest
        .fn()
        .mockReturnValue({ then: (cb) => cb(resultsSuggestions) });
    mockClient.click = jest.fn().mockReturnValue({
        then: () => {
            return;
        }
    });
});
function getLastSearchCall() {
    return mockClient.search.mock.calls[0];
}
function getLastSuggestCall() {
    return mockClient.querySuggestion.mock.calls[0];
}
function getLastClickCall() {
    return mockClient.click.mock.calls[0];
}
describe("AppSearchAPIConnector", () => {
    it("can be initialized with hostIdentifier", () => {
        const connector = new AppSearchAPIConnector(params);
        expect(connector).toBeInstanceOf(AppSearchAPIConnector);
    });
    it("can be initialized with endpointBase", () => {
        const params = {
            engineName: "some-engine",
            searchKey: "search-XXXXX",
            endpointBase: "http://localhost:3001"
        };
        const connector = new AppSearchAPIConnector(params);
        expect(connector).toBeInstanceOf(AppSearchAPIConnector);
        expect(ElasticAppSearch.createClient).toHaveBeenCalledWith({
            apiKey: "search-XXXXX",
            cacheResponses: true,
            endpointBase: "http://localhost:3001",
            engineName: "some-engine"
        });
    });
    // The use case for this is mostly internal to Elastic, where we rely on the logged in user session (via cookies) to authenticate
    it("can be initialized without a searchKey", () => {
        const newParams = Object.assign(Object.assign({}, params), { searchKey: undefined });
        const connector = new AppSearchAPIConnector(newParams);
        expect(connector).toBeInstanceOf(AppSearchAPIConnector);
    });
    it("will throw when missing required parameters", () => {
        expect(() => {
            new AppSearchAPIConnector({});
        }).toThrow();
    });
    describe("onResultClick", () => {
        function subject() {
            const connector = new AppSearchAPIConnector(Object.assign({}, params));
            return connector.onResultClick({
                query: "test",
                documentId: "11111",
                requestId: "12345",
                tags: ["test"]
            });
        }
        it("calls the App Search click endpoint", () => {
            subject();
            expect(getLastClickCall()).toBeDefined();
        });
        it("passes query, documentId, and requestId to the click endpoint", () => {
            subject();
            const [{ query, documentId, requestId }] = getLastClickCall();
            expect(query).toEqual("test");
            expect(documentId).toEqual("11111");
            expect(requestId).toEqual("12345");
        });
        it("appends tags to a base 'results' tag", () => {
            subject();
            const [{ tags }] = getLastClickCall();
            expect(tags).toEqual(["test", "results"]);
        });
    });
    describe("onAutocompleteResultClick", () => {
        function subject() {
            const connector = new AppSearchAPIConnector(Object.assign({}, params));
            return connector.onAutocompleteResultClick({
                query: "test",
                documentId: "11111",
                requestId: "12345",
                tags: ["test"]
            });
        }
        it("calls the App Search click endpoint", () => {
            subject();
            expect(getLastClickCall()).toBeDefined();
        });
        it("passes query, documentId, and requestId to the click endpoint", () => {
            subject();
            const [{ query, documentId, requestId }] = getLastClickCall();
            expect(query).toEqual("test");
            expect(documentId).toEqual("11111");
            expect(requestId).toEqual("12345");
        });
        it("appends tags to a base 'autocomplete' tag", () => {
            subject();
            const [{ tags }] = getLastClickCall();
            expect(tags).toEqual(["test", "autocomplete"]);
        });
    });
    describe("onSearch", () => {
        function subject(state, queryConfig = {}, beforeSearchCall) {
            if (!state.searchTerm)
                state.searchTerm = "searchTerm";
            const connector = new AppSearchAPIConnector(Object.assign(Object.assign({}, params), { beforeSearchCall }));
            return connector.onSearch(state, queryConfig);
        }
        it("will return updated search state", () => __awaiter(void 0, void 0, void 0, function* () {
            const state = yield subject(Object.assign({}, DEFAULT_STATE));
            expect(state).toEqual(resultState);
        }));
        it("will pass request state through to search endpoint", () => __awaiter(void 0, void 0, void 0, function* () {
            const state = Object.assign(Object.assign({}, DEFAULT_STATE), { current: 2, resultsPerPage: 10, searchTerm: "searchTerm", filters: [
                    {
                        field: "world_heritage_site",
                        values: ["true"],
                        type: "all"
                    }
                ], sortDirection: "desc", sortField: "name" });
            yield subject(state);
            const [passedSearchTerm, passedOptions] = getLastSearchCall();
            expect(passedSearchTerm).toEqual(state.searchTerm);
            expect(passedOptions).toEqual({
                filters: {
                    all: [
                        {
                            all: [
                                {
                                    world_heritage_site: "true"
                                }
                            ]
                        }
                    ]
                },
                sort: {
                    name: "desc"
                },
                page: {
                    current: 2,
                    size: 10
                }
            });
        }));
        it("will pass queryConfig to search endpoint", () => __awaiter(void 0, void 0, void 0, function* () {
            const state = Object.assign(Object.assign({}, DEFAULT_STATE), { searchTerm: "searchTerm" });
            const queryConfig = {
                facets: {
                    states: {
                        type: "value",
                        size: 30
                    }
                },
                result_fields: {
                    title: { raw: {}, snippet: { size: 20, fallback: true } }
                },
                search_fields: {
                    title: {},
                    description: {},
                    states: {}
                }
            };
            yield subject(state, queryConfig);
            const [passedSearchTerm, passedOptions] = getLastSearchCall();
            expect(passedSearchTerm).toEqual(state.searchTerm);
            expect(passedOptions).toEqual({
                facets: {
                    states: {
                        type: "value",
                        size: 30
                    }
                },
                page: {
                    current: 1,
                    size: 20
                },
                result_fields: {
                    title: { raw: {}, snippet: { size: 20, fallback: true } }
                },
                search_fields: {
                    title: {},
                    description: {},
                    states: {}
                }
            });
        }));
        it("will not pass empty facets or filter state to search endpoint", () => __awaiter(void 0, void 0, void 0, function* () {
            const state = Object.assign(Object.assign({}, DEFAULT_STATE), { searchTerm: "searchTerm", filters: [], facets: {} });
            const queryConfig = {
                filters: [],
                facets: {}
            };
            yield subject(state, queryConfig);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const [passedSearchTerm, passedOptions] = getLastSearchCall();
            expect(passedOptions).toEqual({
                page: {
                    current: 1,
                    size: 20
                }
            });
        }));
        it("will pass request parameter state provided to queryConfig, overriding the same value provided in state", () => __awaiter(void 0, void 0, void 0, function* () {
            const state = Object.assign(Object.assign({}, DEFAULT_STATE), { searchTerm: "searchTerm", current: 1, resultsPerPage: 10, sortDirection: "desc", sortField: "name", filters: [
                    {
                        field: "title",
                        type: "all",
                        values: ["Acadia", "Grand Canyon"]
                    },
                    {
                        field: "world_heritage_site",
                        values: ["true"],
                        type: "all"
                    },
                    {
                        field: "date_made",
                        values: ["yesterday"],
                        type: "all"
                    }
                ] });
            const queryConfig = {
                current: 2,
                resultsPerPage: 5,
                sortDirection: "asc",
                sortField: "title",
                filters: [
                    {
                        field: "date_made",
                        values: ["yesterday"],
                        type: "all"
                    }
                ]
            };
            yield subject(state, queryConfig);
            const [passedSearchTerm, passedOptions] = getLastSearchCall();
            expect(passedSearchTerm).toEqual(state.searchTerm);
            expect(passedOptions).toEqual({
                filters: {
                    all: [
                        {
                            all: [
                                {
                                    title: "Acadia"
                                },
                                {
                                    title: "Grand Canyon"
                                }
                            ]
                        },
                        {
                            all: [
                                {
                                    world_heritage_site: "true"
                                }
                            ]
                        },
                        {
                            all: [{ date_made: "yesterday" }]
                        }
                    ]
                },
                sort: {
                    title: "asc"
                },
                page: {
                    current: 2,
                    size: 5
                }
            });
        }));
        it("will use the beforeSearchCall parameter to amend option parameters to the search endpoint call", () => __awaiter(void 0, void 0, void 0, function* () {
            const state = Object.assign(Object.assign({}, DEFAULT_STATE), { current: 2, searchTerm: "searchTerm" });
            const queryConfig = {
                sortDirection: "desc",
                sortField: "name",
                resultsPerPage: 5
            };
            const beforeSearchCall = (options, next) => {
                // Remove sort_direction and sort_field
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { sort } = options, rest = __rest(options, ["sort"]);
                return next(Object.assign(Object.assign({}, rest), { 
                    // Add test
                    test: "value" }));
            };
            yield subject(state, queryConfig, beforeSearchCall);
            expect(getLastSearchCall()).toEqual([
                state.searchTerm,
                {
                    page: {
                        current: 2,
                        size: 5
                    },
                    test: "value"
                }
            ]);
        }));
    });
    describe("onAutocomplete", () => {
        function subject(state, queryConfig, { beforeAutocompleteResultsCall, beforeAutocompleteSuggestionsCall } = {}) {
            if (!state.searchTerm)
                state.searchTerm = "searchTerm";
            const connector = new AppSearchAPIConnector(Object.assign(Object.assign({}, params), { beforeAutocompleteResultsCall,
                beforeAutocompleteSuggestionsCall }));
            return connector.onAutocomplete(state, queryConfig);
        }
        describe("when 'results' type is requested", () => {
            it("will return search state with autocompletedResults set", () => __awaiter(void 0, void 0, void 0, function* () {
                const state = yield subject(Object.assign({}, DEFAULT_STATE), { results: {} });
                expect(state).toEqual({
                    autocompletedResults: resultState.results,
                    autocompletedResultsRequestId: resultState.requestId
                });
            }));
            it("will pass searchTerm from state through to search endpoint", () => __awaiter(void 0, void 0, void 0, function* () {
                const state = Object.assign(Object.assign({}, DEFAULT_STATE), { searchTerm: "searchTerm" });
                yield subject(state, { results: {} });
                const [passedSearchTerm, passedOptions] = getLastSearchCall();
                expect(passedSearchTerm).toEqual(state.searchTerm);
                expect(passedOptions).toEqual({
                    page: {},
                    record_analytics: false
                });
            }));
            it("will pass queryConfig to search endpoint", () => __awaiter(void 0, void 0, void 0, function* () {
                const state = Object.assign(Object.assign({}, DEFAULT_STATE), { searchTerm: "searchTerm" });
                const queryConfig = {
                    results: {
                        result_fields: {
                            title: { raw: {}, snippet: { size: 20, fallback: true } }
                        },
                        search_fields: {
                            title: {},
                            description: {},
                            states: {}
                        }
                    }
                };
                yield subject(state, queryConfig);
                const [passedSearchTerm, passedOptions] = getLastSearchCall();
                expect(passedSearchTerm).toEqual(state.searchTerm);
                expect(passedOptions).toEqual({
                    record_analytics: false,
                    page: {},
                    result_fields: {
                        title: { raw: {}, snippet: { size: 20, fallback: true } }
                    },
                    search_fields: {
                        title: {},
                        description: {},
                        states: {}
                    }
                });
            }));
            it("will not pass empty facets or filter state to search endpoint", () => __awaiter(void 0, void 0, void 0, function* () {
                const state = Object.assign(Object.assign({}, DEFAULT_STATE), { searchTerm: "searchTerm", filters: [], facets: {} });
                const queryConfig = {
                    results: {
                        filters: [],
                        facets: {}
                    }
                };
                yield subject(state, queryConfig);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const [passedSearchTerm, passedOptions] = getLastSearchCall();
                expect(passedOptions).toEqual({
                    page: {},
                    record_analytics: false
                });
            }));
            it("will pass request parameter state provided to queryConfig", () => __awaiter(void 0, void 0, void 0, function* () {
                const state = Object.assign(Object.assign({}, DEFAULT_STATE), { searchTerm: "searchTerm" });
                const queryConfig = {
                    results: {
                        current: 2,
                        resultsPerPage: 5,
                        filters: [
                            {
                                field: "world_heritage_site",
                                values: ["true"],
                                type: "all"
                            }
                        ],
                        sortDirection: "desc",
                        sortField: "name"
                    }
                };
                yield subject(state, queryConfig);
                const [passedSearchTerm, passedOptions] = getLastSearchCall();
                expect(passedSearchTerm).toEqual(state.searchTerm);
                expect(passedOptions).toEqual({
                    filters: {
                        all: [
                            {
                                all: [
                                    {
                                        world_heritage_site: "true"
                                    }
                                ]
                            }
                        ]
                    },
                    record_analytics: false,
                    page: {
                        current: 2,
                        size: 5
                    },
                    sort: {
                        name: "desc"
                    }
                });
            }));
        });
        describe("when 'suggestions' type is requested", () => {
            it("will return search state with autocompletedSuggestions set", () => __awaiter(void 0, void 0, void 0, function* () {
                const state = yield subject(Object.assign({}, DEFAULT_STATE), { suggestions: {} });
                expect(state).toEqual({
                    autocompletedSuggestions: resultsSuggestions.results,
                    autocompletedSuggestionsRequestId: resultsSuggestions.meta.request_id
                });
            }));
            it("will pass searchTerm from state through to search endpoint", () => __awaiter(void 0, void 0, void 0, function* () {
                const state = Object.assign(Object.assign({}, DEFAULT_STATE), { searchTerm: "searchTerm" });
                yield subject(state, { suggestions: {} });
                const [passedSearchTerm, passedOptions] = getLastSuggestCall();
                expect(passedSearchTerm).toEqual(state.searchTerm);
                expect(passedOptions).toEqual({});
            }));
            it("will pass queryConfig to search endpoint", () => __awaiter(void 0, void 0, void 0, function* () {
                const state = Object.assign(Object.assign({}, DEFAULT_STATE), { searchTerm: "searchTerm" });
                const queryConfig = {
                    suggestions: {
                        types: {
                            documents: {
                                fields: ["title"]
                            }
                        }
                    }
                };
                yield subject(state, queryConfig);
                const [passedSearchTerm, passedOptions] = getLastSuggestCall();
                expect(passedSearchTerm).toEqual(state.searchTerm);
                expect(passedOptions).toEqual({
                    types: {
                        documents: {
                            fields: ["title"]
                        }
                    }
                });
            }));
        });
        describe("when 'results' and 'suggestions' type are both requested", () => {
            it("will return search state with autocompletedSuggestions and autocompletedResults set", () => __awaiter(void 0, void 0, void 0, function* () {
                const state = yield subject(Object.assign({}, DEFAULT_STATE), { suggestions: {}, results: {} });
                expect(state).toEqual({
                    autocompletedSuggestions: resultsSuggestions.results,
                    autocompletedSuggestionsRequestId: resultsSuggestions.meta.request_id,
                    autocompletedResults: resultState.results,
                    autocompletedResultsRequestId: resultState.requestId
                });
            }));
        });
        describe("beforeAutocompleteResultsCall", () => {
            it("will use the beforeAutocompleteResultsCall parameter to amend option parameters to the search endpoint call", () => __awaiter(void 0, void 0, void 0, function* () {
                const state = Object.assign(Object.assign({}, DEFAULT_STATE), { current: 2, searchTerm: "searchTerm" });
                const queryConfig = {
                    results: {
                        sortDirection: "desc",
                        sortField: "name",
                        resultsPerPage: 5
                    }
                };
                const beforeAutocompleteResultsCall = (options, next) => {
                    // Remove sort_direction and sort_field
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const { sort } = options, rest = __rest(options, ["sort"]);
                    return next(Object.assign(Object.assign({}, rest), { 
                        // Add test
                        test: "value" }));
                };
                yield subject(state, queryConfig, { beforeAutocompleteResultsCall });
                expect(getLastSearchCall()).toEqual([
                    state.searchTerm,
                    {
                        record_analytics: false,
                        page: {
                            size: 5
                        },
                        test: "value"
                    }
                ]);
            }));
        });
        describe("beforeAutocompleteSuggestionsCall", () => {
            it("will use the beforeAutocompleteSuggestionsCall parameter to amend option parameters to the search endpoint call", () => __awaiter(void 0, void 0, void 0, function* () {
                const state = Object.assign(Object.assign({}, DEFAULT_STATE), { current: 2, searchTerm: "searchTerm", sortDirection: "desc", sortField: "name" });
                const queryConfig = {
                    suggestions: {}
                };
                const beforeAutocompleteSuggestionsCall = (options, next) => {
                    // Remove sort_direction and sort_field
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const _a = options, { sort } = _a, rest = __rest(_a, ["sort"]); // TODO: Does the "sort" key ever exist in the options?
                    return next(Object.assign(Object.assign({}, rest), { 
                        // Add test
                        test: "value" }));
                };
                yield subject(state, queryConfig, {
                    beforeAutocompleteSuggestionsCall
                });
                expect(getLastSuggestCall()).toEqual([
                    state.searchTerm,
                    {
                        test: "value"
                    }
                ]);
                yield subject(Object.assign({}, DEFAULT_STATE), { suggestions: {} }, {
                    beforeAutocompleteSuggestionsCall: (queryOptions, next) => next(Object.assign(Object.assign({}, queryOptions), { test: "value" }))
                });
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const [_, passedOptions] = getLastSuggestCall();
                expect(passedOptions).toEqual({ test: "value" });
            }));
        });
        describe("when no type is requested", () => {
            it("will return empty state", () => __awaiter(void 0, void 0, void 0, function* () {
                const state = yield subject(Object.assign({}, DEFAULT_STATE), {});
                expect(state).toEqual({});
            }));
        });
    });
});
