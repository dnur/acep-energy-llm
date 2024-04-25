"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitATick = exports.getAutocompleteClickCalls = exports.getClickCalls = exports.getAutocompleteCalls = exports.getSearchCalls = exports.doesStateHaveResponseData = exports.setupDriver = exports.mockPlugin = exports.getMockApiConnectorWithStateAndActions = exports.getMockApiConnector = exports.searchResponse = void 0;
const SearchDriver_1 = __importDefault(require("../SearchDriver"));
const suggestions = {
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
};
exports.searchResponse = {
    totalResults: 1000,
    totalPages: 100,
    requestId: "12345",
    facets: {},
    results: [{}, {}],
    resultSearchTerm: "test",
    pagingStart: 21,
    pagingEnd: 40,
    wasSearched: true,
    rawResponse: {}
};
const autocompleteSearchResponse = {
    requestId: "6789",
    results: [{}, {}]
};
function getMockApiConnector() {
    return {
        onAutocomplete: jest.fn().mockReturnValue({
            then: (cb) => cb({
                autocompletedResults: autocompleteSearchResponse.results,
                autocompletedResultsRequestId: autocompleteSearchResponse.requestId,
                autocompletedSuggestions: suggestions
            })
        }),
        onSearch: jest.fn().mockReturnValue({ then: (cb) => cb(exports.searchResponse) }),
        onResultClick: jest.fn().mockReturnValue(Promise.resolve(true)),
        onAutocompleteResultClick: jest.fn().mockReturnValue(Promise.resolve(true))
    };
}
exports.getMockApiConnector = getMockApiConnector;
function getMockApiConnectorWithStateAndActions() {
    return Object.assign(Object.assign({}, getMockApiConnector()), { state: { foo: "foo" }, actions: {
            bar: jest.fn().mockReturnValue("bar")
        } });
}
exports.getMockApiConnectorWithStateAndActions = getMockApiConnectorWithStateAndActions;
exports.mockPlugin = {
    subscribe: jest.fn()
};
function setupDriver(_a = {
    mockSearchResponse: null,
    mockApiConnector: null
}) {
    var { mockSearchResponse, mockApiConnector } = _a, rest = __rest(_a, ["mockSearchResponse", "mockApiConnector"]);
    mockApiConnector = mockApiConnector || getMockApiConnector();
    if (mockSearchResponse) {
        mockApiConnector.onSearch = jest.fn().mockReturnValue({
            then: (cb) => cb(mockSearchResponse)
        });
    }
    const driver = new SearchDriver_1.default(Object.assign(Object.assign({ apiConnector: mockApiConnector, initialState: null }, rest), { 
        // We don't want to deal with async in our tests, so pass 0 so URL state
        // pushes happen synchronously
        urlPushDebounceLength: 0, plugins: [exports.mockPlugin] }));
    const updatedStateAfterAction = { state: null };
    driver.subscribeToStateChanges((newState) => {
        updatedStateAfterAction.state = newState;
    });
    jest.runAllTimers();
    return {
        stateAfterCreation: driver.getState(),
        driver,
        updatedStateAfterAction,
        mockApiConnector
    };
}
exports.setupDriver = setupDriver;
function doesStateHaveResponseData(response) {
    const { requestId, results, totalPages, totalResults, wasSearched } = response;
    return (!!results &&
        results.length &&
        !!requestId &&
        totalPages > 0 &&
        totalResults > 0 &&
        !!wasSearched);
}
exports.doesStateHaveResponseData = doesStateHaveResponseData;
function getSearchCalls(mockApiConnector) {
    return mockApiConnector.onSearch.mock.calls;
}
exports.getSearchCalls = getSearchCalls;
function getAutocompleteCalls(mockApiConnector) {
    return mockApiConnector.onAutocomplete.mock.calls;
}
exports.getAutocompleteCalls = getAutocompleteCalls;
function getClickCalls(mockApiConnector) {
    return mockApiConnector.onResultClick.mock.calls;
}
exports.getClickCalls = getClickCalls;
function getAutocompleteClickCalls(mockApiConnector) {
    return mockApiConnector.onAutocompleteResultClick.mock.calls;
}
exports.getAutocompleteClickCalls = getAutocompleteClickCalls;
/**
 * Returns a promise that resolves after the current event loop.
 *
 * Useful for writing `await waitATick()` to wait for a promise to resolve.
 */
function waitATick() {
    let promiseResolve;
    const promise = new Promise((resolve) => (promiseResolve = resolve));
    setTimeout(() => promiseResolve());
    jest.runAllTimers();
    return promise;
}
exports.waitATick = waitATick;
