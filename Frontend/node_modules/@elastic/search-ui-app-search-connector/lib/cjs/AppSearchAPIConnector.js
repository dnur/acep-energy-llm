"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ElasticAppSearch = __importStar(require("@elastic/app-search-javascript"));
const responseAdapter_1 = require("./responseAdapter");
const requestAdapters_1 = require("./requestAdapters");
const buildResponseAdapterOptions_1 = __importDefault(require("./buildResponseAdapterOptions"));
// The API will error out if empty facets or filters objects
// are sent.
function removeEmptyFacetsAndFilters(options) {
    const { facets, filters } = options, rest = __rest(options, ["facets", "filters"]);
    return Object.assign(Object.assign(Object.assign({}, (facets && Object.entries(facets).length > 0 && { facets })), (filters && Object.entries(filters).length > 0 && { filters })), rest);
}
class AppSearchAPIConnector {
    /**
     * @param {Options} options
     */
    constructor(_a) {
        var { searchKey, engineName, beforeSearchCall = (queryOptions, next) => next(queryOptions), beforeAutocompleteResultsCall = (queryOptions, next) => next(queryOptions), beforeAutocompleteSuggestionsCall = (queryOptions, next) => next(queryOptions), cacheResponses = true } = _a, rest = __rest(_a, ["searchKey", "engineName", "beforeSearchCall", "beforeAutocompleteResultsCall", "beforeAutocompleteSuggestionsCall", "cacheResponses"]);
        if (!engineName || !("hostIdentifier" in rest || "endpointBase" in rest)) {
            throw Error("hostIdentifier or endpointBase, and engineName are required");
        }
        this.client = ElasticAppSearch.createClient(Object.assign(Object.assign(Object.assign(Object.assign({}, ("endpointBase" in rest && { endpointBase: rest.endpointBase })), ("hostIdentifier" in rest && { hostIdentifier: rest.hostIdentifier })), { apiKey: searchKey, engineName: engineName, cacheResponses: cacheResponses }), rest));
        this.beforeSearchCall = beforeSearchCall;
        this.beforeAutocompleteResultsCall = beforeAutocompleteResultsCall;
        this.beforeAutocompleteSuggestionsCall = beforeAutocompleteSuggestionsCall;
    }
    onResultClick({ query, documentId, requestId, tags = [] }) {
        tags = tags.concat("results");
        return this.client.click({ query, documentId, requestId, tags });
    }
    onAutocompleteResultClick({ query, documentId, requestId, tags = [] }) {
        tags = tags.concat("autocomplete");
        return this.client.click({ query, documentId, requestId, tags });
    }
    onSearch(state, queryConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            const { current, resultsPerPage, sortDirection, sortField, sortList } = queryConfig, restOfQueryConfig = __rest(queryConfig, ["current", "resultsPerPage", "sortDirection", "sortField", "sortList"]);
            const _a = (0, requestAdapters_1.adaptRequest)(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, state), (current !== undefined && { current })), (resultsPerPage !== undefined && { resultsPerPage })), (sortDirection !== undefined && { sortDirection })), (sortField !== undefined && { sortField })), (sortList !== undefined && { sortList }))), { query } = _a, optionsFromState = __rest(_a, ["query"]);
            const withQueryConfigOptions = Object.assign(Object.assign({}, restOfQueryConfig), optionsFromState);
            const options = Object.assign({}, removeEmptyFacetsAndFilters(withQueryConfigOptions));
            return this.beforeSearchCall(options, (newOptions) => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.client.search(query, newOptions);
                return (0, responseAdapter_1.adaptResponse)(response, (0, buildResponseAdapterOptions_1.default)(queryConfig));
            }));
        });
    }
    onAutocomplete({ searchTerm }, queryConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            const autocompletedState = {};
            const promises = [];
            if (queryConfig.results) {
                const _a = queryConfig.results, { current, filters, resultsPerPage, sortDirection, sortField, sortList } = _a, restOfQueryConfig = __rest(_a, ["current", "filters", "resultsPerPage", "sortDirection", "sortField", "sortList"]);
                const _b = (0, requestAdapters_1.adaptRequest)({
                    current,
                    searchTerm,
                    filters,
                    resultsPerPage,
                    sortDirection,
                    sortField,
                    sortList
                }), { query } = _b, optionsFromState = __rest(_b, ["query"]);
                const withQueryConfigOptions = Object.assign(Object.assign({}, restOfQueryConfig), optionsFromState);
                const options = removeEmptyFacetsAndFilters(withQueryConfigOptions);
                promises.push(this.beforeAutocompleteResultsCall(options, (newOptions) => {
                    return this.client
                        .search(query, Object.assign(Object.assign({}, newOptions), { record_analytics: false }))
                        .then((response) => {
                        autocompletedState.autocompletedResults =
                            (0, responseAdapter_1.adaptResponse)(response).results;
                        autocompletedState.autocompletedResultsRequestId =
                            response.info.meta.request_id;
                    });
                }));
            }
            if (queryConfig.suggestions) {
                const options = queryConfig.suggestions;
                promises.push(this.beforeAutocompleteSuggestionsCall(options, (newOptions) => this.client
                    .querySuggestion(searchTerm, newOptions)
                    .then((response) => {
                    autocompletedState.autocompletedSuggestions = response.results;
                    autocompletedState.autocompletedSuggestionsRequestId =
                        response.meta.request_id;
                })));
            }
            yield Promise.all(promises);
            return autocompletedState;
        });
    }
}
exports.default = AppSearchAPIConnector;
