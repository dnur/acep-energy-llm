import type { QueryConfig, RequestState, SearchState, SuggestionsQueryConfig, APIConnector, AutocompleteQueryConfig } from "@elastic/search-ui";
interface AppSearchAPIConnectorParamsBase {
    searchKey?: string;
    engineName: string;
    beforeSearchCall?: SearchQueryHook;
    beforeAutocompleteResultsCall?: SearchQueryHook;
    beforeAutocompleteSuggestionsCall?: SuggestionsQueryHook;
    cacheResponses?: boolean;
}
interface AppSearchAPIConnectorParamsForSwiftType extends AppSearchAPIConnectorParamsBase {
    hostIdentifier: string;
}
interface AppSearchAPIConnectorParamsForOther extends AppSearchAPIConnectorParamsBase {
    endpointBase: string;
}
export declare type AppSearchAPIConnectorParams = AppSearchAPIConnectorParamsForSwiftType | AppSearchAPIConnectorParamsForOther;
interface ResultClickParams {
    query: string;
    documentId: string;
    requestId: string;
    tags: string[];
}
export declare type SearchQueryHook = (queryOptions: QueryConfig, next: (newQueryOptions: any) => any) => any;
export declare type SuggestionsQueryHook = (queryOptions: SuggestionsQueryConfig, next: (newQueryOptions: any) => any) => any;
declare class AppSearchAPIConnector implements APIConnector {
    /**
     * @callback next
     * @param {Object} updatedQueryOptions The options to send to the API
     */
    /**
     * @callback hook
     * @param {Object} queryOptions The options that are about to be sent to the API
     * @param {next} next The options that are about to be sent to the API
     */
    /**
     * @typedef Options
     * @param {string} searchKey Credential found in your App Search Dashboard
     * @param {string} engineName Engine to query, found in your App Search Dashboard
     * @param {string} hostIdentifier Credential found in your App Search Dashboard
     *  Useful when proxying the Swiftype API or developing against a local API server.
     * @param {hook} beforeSearchCall=(queryOptions,next)=>next(queryOptions) A hook to amend query options before the request is sent to the
     *   API in a query on an "onSearch" event.
     * @param {hook} beforeAutocompleteResultsCall=(queryOptions,next)=>next(queryOptions) A hook to amend query options before the request is sent to the
     *   API in a "results" query on an "onAutocomplete" event.
     * @param {hook} beforeAutocompleteSuggestionsCall=(queryOptions,next)=>next(queryOptions) A hook to amend query options before the request is sent to
     * the API in a "suggestions" query on an "onAutocomplete" event.
     * @param {string} endpointBase="" Overrides the base of the Swiftype API endpoint completely.
     */
    client: any;
    beforeSearchCall?: SearchQueryHook;
    beforeAutocompleteResultsCall?: SearchQueryHook;
    beforeAutocompleteSuggestionsCall?: SuggestionsQueryHook;
    /**
     * @param {Options} options
     */
    constructor({ searchKey, engineName, beforeSearchCall, beforeAutocompleteResultsCall, beforeAutocompleteSuggestionsCall, cacheResponses, ...rest }: AppSearchAPIConnectorParams);
    onResultClick({ query, documentId, requestId, tags }: ResultClickParams): void;
    onAutocompleteResultClick({ query, documentId, requestId, tags }: ResultClickParams): void;
    onSearch(state: RequestState, queryConfig: QueryConfig): Promise<SearchState>;
    onAutocomplete({ searchTerm }: RequestState, queryConfig: AutocompleteQueryConfig): Promise<SearchState>;
}
export default AppSearchAPIConnector;
