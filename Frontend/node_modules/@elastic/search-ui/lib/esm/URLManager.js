import { createBrowserHistory as createHistory, createMemoryHistory } from "history";
import queryString from "./queryString";
function isNumericString(num) {
    return !isNaN(num);
}
function toSingleValue(val) {
    return Array.isArray(val) ? val[val.length - 1] : val;
}
function toSingleValueInteger(num) {
    return toInteger(toSingleValue(num));
}
function toInteger(num) {
    if (!isNumericString(num))
        return;
    return parseInt(num, 10);
}
function parseFiltersFromQueryParams(queryParams) {
    return queryParams.filters;
}
function parseCurrentFromQueryParams(queryParams) {
    return toSingleValueInteger(queryParams.current);
}
function parseSearchTermFromQueryParams(queryParams) {
    return toSingleValue(queryParams.q);
}
function parseOldSortFromQueryParams(queryParams) {
    const sortField = toSingleValue(queryParams["sort-field"]);
    const sortDirection = toSingleValue(queryParams["sort-direction"]);
    if (sortField)
        return [sortField, sortDirection];
    return [];
}
function parseSizeFromQueryParams(queryParams) {
    return toSingleValueInteger(queryParams.size);
}
function parseSortFromQueryParams(queryParams) {
    return queryParams["sort"];
}
function paramsToState(queryParams) {
    const state = {
        current: parseCurrentFromQueryParams(queryParams),
        filters: parseFiltersFromQueryParams(queryParams),
        searchTerm: parseSearchTermFromQueryParams(queryParams),
        resultsPerPage: parseSizeFromQueryParams(queryParams),
        sortField: parseOldSortFromQueryParams(queryParams)[0],
        sortDirection: parseOldSortFromQueryParams(queryParams)[1],
        sortList: parseSortFromQueryParams(queryParams)
    };
    return Object.keys(state).reduce((acc, key) => {
        const value = state[key];
        if (value)
            acc[key] = value;
        return acc;
    }, {});
}
function stateToParams({ searchTerm, current, filters, resultsPerPage, sortDirection, sortField, sortList }) {
    const params = {};
    if (current > 1)
        params.current = current;
    if (searchTerm)
        params.q = searchTerm;
    if (resultsPerPage)
        params.size = resultsPerPage;
    if (filters && filters.length > 0) {
        params["filters"] = filters;
    }
    if (sortList && sortList.length > 0) {
        params["sort"] = sortList;
    }
    else if (sortField) {
        params["sort-field"] = sortField;
        params["sort-direction"] = sortDirection;
    }
    return params;
}
function stateToQueryString(state) {
    return queryString.stringify(stateToParams(state));
}
export default class URLManager {
    constructor(routingOptions = {}) {
        this.routingOptions = {
            readUrl: routingOptions.readUrl || this.readUrl.bind(this),
            writeUrl: routingOptions.writeUrl || this.writeUrl.bind(this),
            urlToState: routingOptions.urlToState || this.urlToState.bind(this),
            stateToUrl: routingOptions.stateToUrl || this.stateToUrl.bind(this),
            routeChangeHandler: routingOptions.routeChangeHandler || this.routeChangeHandler.bind(this)
        };
        this.history =
            typeof window !== "undefined" ? createHistory() : createMemoryHistory();
        this.lastPushSearchString = "";
    }
    /*
     * These functions are used to read and write the URL
     * Its designed to be overriden by the developer for their own 3rd party routing needs.
     * For example developers override this function to use next.js
     *
     **/
    readUrl() {
        return this.history ? this.history.location.search : "";
    }
    writeUrl(url, { replaceUrl = false } = {}) {
        const navigationFunction = replaceUrl
            ? this.history.replace
            : this.history.push;
        navigationFunction(`?${url}`);
    }
    /*
     * This function is used to convert a URL into a state object and vice versa
     * the state is stored as a search string in the URL.
     * Developers own implementations of this function should be able to handle full urls
     * and not just the search string.
     **/
    urlToState(url) {
        return paramsToState(queryString.parse(url));
    }
    stateToUrl(state) {
        return `${stateToQueryString(state)}`;
    }
    /**
     * Parse the current URL into application state
     *
     * @return {Object} - The parsed state object
     */
    getStateFromURL() {
        return this.routingOptions.urlToState(this.routingOptions.readUrl());
    }
    /**
     * Push the current state of the application to the URL
     *
     * @param {Object} state - The entire current state from the SearchDriver
     * @param {boolean} options
     * @param {boolean} options.replaceUrl - When pushing state to the URL, use history 'replace'
     * rather than 'push' to avoid adding a new history entry
     */
    pushStateToURL(state, { replaceUrl = false } = {}) {
        const url = this.routingOptions.stateToUrl(state);
        this.lastPushSearchString = url;
        this.routingOptions.writeUrl(url, { replaceUrl });
    }
    /**
     * Add an event handler to be executed whenever state is pushed to the URL
     *
     * @callback requestCallback
     * @param {Object} state - Updated application state parsed from the new URL
     *
     * @param {requestCallback} callback
     */
    onURLStateChange(callback) {
        const handler = (url) => {
            if (`?${this.lastPushSearchString}` === url)
                return;
            // Once we've decided to return based on lastPushSearchString, reset
            // it so that we don't break back / forward button.
            this.lastPushSearchString = "";
            callback(this.routingOptions.urlToState(url));
        };
        this.unlisten = this.routingOptions.routeChangeHandler(handler.bind(this));
    }
    routeChangeHandler(callback) {
        const handler = (location) => {
            callback(location.search);
        };
        return this.history.listen(handler);
    }
    tearDown() {
        this.unlisten();
    }
}
