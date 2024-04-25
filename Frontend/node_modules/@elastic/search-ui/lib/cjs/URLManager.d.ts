import { History } from "history";
import { RequestState } from "./types";
/**
 * The URL Manager is responsible for synchronizing state between
 * SearchDriver and the URL. There are 3 main cases we handle when
 * synchronizing:
 *
 * 1. When the app loads, SearchDriver will need to
 * read the current state from the URL, in order to perform the search
 * expressed by the query string. `getStateFromURL` is used for this case.
 *
 * 2. When the URL changes as a result of `pushState` or `replaceState`,
 * SearchDriver will need to be notified and given the updated state, so that
 * it can re-run the current search. `onURLStateChange` is used for this case.
 *
 * 3. When state changes internally in the SearchDriver, as a result of an
 * Action, it will need to notify the URLManager of the change. `pushStateToURL`
 * is used for this case.
 */
interface RoutingHandler {
    readUrl: () => string;
    writeUrl: (url: string, { replaceUrl }: {
        replaceUrl: boolean;
    }) => void;
    urlToState: (url: string) => RequestState;
    stateToUrl: (state: RequestState) => string;
    routeChangeHandler: (handler: (url?: string) => void) => () => void;
}
export declare type RoutingHandlerOptions = Partial<RoutingHandler>;
declare type RoutingChangeCallback = (state: RequestState) => void;
export default class URLManager {
    history: History;
    lastPushSearchString: string;
    unlisten?: () => void;
    overrides: any;
    routingOptions: RoutingHandler;
    constructor(routingOptions?: RoutingHandlerOptions);
    readUrl(): string;
    writeUrl(url: string, { replaceUrl }?: {
        replaceUrl?: boolean;
    }): void;
    urlToState(url: string): RequestState;
    stateToUrl(state: RequestState): string;
    /**
     * Parse the current URL into application state
     *
     * @return {Object} - The parsed state object
     */
    getStateFromURL(): RequestState;
    /**
     * Push the current state of the application to the URL
     *
     * @param {Object} state - The entire current state from the SearchDriver
     * @param {boolean} options
     * @param {boolean} options.replaceUrl - When pushing state to the URL, use history 'replace'
     * rather than 'push' to avoid adding a new history entry
     */
    pushStateToURL(state: RequestState, { replaceUrl }?: {
        replaceUrl?: boolean;
    }): void;
    /**
     * Add an event handler to be executed whenever state is pushed to the URL
     *
     * @callback requestCallback
     * @param {Object} state - Updated application state parsed from the new URL
     *
     * @param {requestCallback} callback
     */
    onURLStateChange(callback: RoutingChangeCallback): void;
    routeChangeHandler(callback: any): import("history").UnregisterCallback;
    tearDown(): void;
}
export {};
