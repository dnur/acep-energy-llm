import URLManager, { RoutingHandlerOptions } from "./URLManager";
import RequestSequencer from "./RequestSequencer";
import DebounceManager from "./DebounceManager";
import * as actions from "./actions";
import Events from "./Events";
import { AutocompleteResponseState, AutocompleteSearchQuery, Plugin, QueryConfig, ResponseState } from ".";
import { AutocompleteQueryConfig, SearchState, SearchQuery, APIConnector, RequestState } from "./types";
export declare const DEFAULT_STATE: SearchState;
export declare type onSearchHook = (query: RequestState, queryConfig: QueryConfig, next: (state: RequestState, queryConfig: QueryConfig) => Promise<ResponseState>) => Promise<ResponseState>;
export declare type onAutocompleteHook = (query: AutocompleteSearchQuery, queryConfig: QueryConfig, next: (state: RequestState, queryConfig: QueryConfig) => Promise<AutocompleteResponseState>) => Promise<AutocompleteResponseState>;
export declare type onResultClickHook = (resultParams: any) => void;
export declare type onAutocompleteResultClickHook = (resultParams: any) => void;
export declare type SearchDriverOptions = {
    apiConnector: APIConnector;
    plugins?: Plugin[];
    autocompleteQuery?: AutocompleteQueryConfig;
    debug?: boolean;
    initialState?: Partial<RequestState>;
    onSearch?: onSearchHook;
    onAutocomplete?: onAutocompleteHook;
    onResultClick?: onResultClickHook;
    onAutocompleteResultClick?: onAutocompleteResultClickHook;
    searchQuery?: SearchQuery;
    trackUrlState?: boolean;
    routingOptions?: RoutingHandlerOptions;
    urlPushDebounceLength?: number;
    hasA11yNotifications?: boolean;
    a11yNotificationMessages?: Record<string, unknown>;
    alwaysSearchOnInitialLoad?: boolean;
};
export declare type SubscriptionHandler = (state: SearchState) => void;
interface SearchDriver extends actions.SearchDriverActions {
    actions: actions.SearchDriverActions;
}
declare class SearchDriver {
    state: SearchState;
    debug: boolean;
    events: Events;
    plugins: Plugin[];
    autocompleteRequestSequencer: RequestSequencer;
    searchRequestSequencer: RequestSequencer;
    debounceManager: DebounceManager;
    autocompleteQuery: AutocompleteQueryConfig;
    searchQuery: SearchQuery;
    subscriptions: SubscriptionHandler[];
    trackUrlState: boolean;
    urlPushDebounceLength: number;
    alwaysSearchOnInitialLoad: boolean;
    URLManager: URLManager;
    hasA11yNotifications: boolean;
    a11yNotificationMessages: Record<string, (expansions?: Record<string, unknown>) => string>;
    startingState: SearchState;
    apiConnector?: APIConnector;
    constructor({ apiConnector, autocompleteQuery, plugins, debug, initialState, onSearch, onAutocomplete, onResultClick, onAutocompleteResultClick, searchQuery, trackUrlState, routingOptions, urlPushDebounceLength, hasA11yNotifications, a11yNotificationMessages, alwaysSearchOnInitialLoad }: SearchDriverOptions);
    /**
     * This method is used to update state and trigger a new autocomplete search.
     *
     * @param {string} searchTerm
     * @param {Object=} Object
     * @param {boolean|Object} options.autocompleteResults - Should autocomplete results
     * @param {boolean|Object} options.autocompleteSuggestions - Should autocomplete suggestions
     */
    private _updateAutocomplete;
    /**
     * This method is used to update state and trigger a new search.
     *
     * @typedef {Object} RequestState
     * @property {number} current
     * @property {number} resultsPerPage
     * @property {string} searchTerm
     * @property {string} sortDirection
     * @property {string} sortField
     * @property {Array} sortList
     *
     * @param {RequestState} searchParameters - RequestState
     * @param {Object=} Object
     * @param {boolean} options.skipPushToUrl - Skip pushing the updated to the URL
     * @param {boolean} options.replaceUrl - When pushing state to the URL, use history 'replace'
     * rather than 'push' to avoid adding a new history entry
     */
    _updateSearchResults: (searchParameters: RequestState, { skipPushToUrl, replaceUrl }?: {
        skipPushToUrl?: boolean;
        replaceUrl?: boolean;
    }) => void;
    /**
     * This method is separated out from _updateSearchResults so that it
     * can be debounced.
     *
     * By debouncing our API calls, we can effectively allow action chaining.
     *
     * For Ex:
     *
     * If a user needs to make multiple filter updates at once, they could
     * do so by calling an action 3 times in a row:
     *
     *   addFilter("states", "California");
     *   addFilter("states", "Nebraska");
     *   addFilter("states", "Pennsylvania");
     *
     * We don't want to make 3 separate API calls like that in quick succession,
     * so we debounce the API calls.
     *
     * Application state updates are performed in _updateSearchResults, but we
     * wait to make the actual API calls until all actions have been called.
     *
     * @param {Object} options
     * @param {boolean} options.skipPushToUrl - Skip pushing the updated to the URL
     * @param {boolean} options.replaceUrl - When pushing state to the URL, use history 'replace'
     * rather than 'push' to avoid adding a new history entry
     */
    private _makeSearchRequest;
    private _setState;
    /**
     * Dynamically update the searchQuery configuration in this driver.
     * This will issue a new query after being updated.
     *
     * @param Object searchQuery
     */
    setSearchQuery(searchQuery: SearchQuery): void;
    /**
     * @param Object autocompleteQuery
     */
    setAutocompleteQuery(autocompleteQuery: AutocompleteQueryConfig): void;
    /**
     * Any time state is updated in this Driver, the provided callback
     * will be executed with the updated state.
     *
     * @param onStateChange Function
     */
    subscribeToStateChanges(onStateChange: SubscriptionHandler): void;
    /**
     * @param onStateChange Function
     */
    unsubscribeToStateChanges(onStateChange: SubscriptionHandler): void;
    /**
     * Remove all listeners
     */
    tearDown(): void;
    /**
     * Retrieves all available actions
     *
     * @returns Object All actions
     */
    getActions(): actions.SearchDriverActions;
    /**
     * Retrieve current state. Typically used on app initialization. Subsequent
     * state updates should come through subscription.
     *
     * @returns Object Current state
     */
    getState(): SearchState;
}
export default SearchDriver;
