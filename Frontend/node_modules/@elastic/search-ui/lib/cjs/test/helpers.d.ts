/// <reference types="jest" />
import SearchDriver, { SearchDriverOptions } from "../SearchDriver";
import { APIConnector, Filter, SearchState, ResponseState } from "../types";
export declare type SubjectArguments = {
    initialState?: Partial<SearchState>;
    initialFilters?: Filter[];
    autocompleteResults?: boolean;
    autocompleteSuggestions?: boolean;
    refresh?: boolean;
    shouldClearFilters?: boolean;
};
export declare const searchResponse: ResponseState;
export declare function getMockApiConnector(): APIConnector;
export declare function getMockApiConnectorWithStateAndActions(): {
    state: {
        foo: string;
    };
    actions: {
        bar: jest.Mock<any, any>;
    };
    onSearch: (state: import("../types").RequestState, queryConfig: import("../types").QueryConfig) => Promise<ResponseState>;
    onAutocomplete(state: import("../types").RequestState, queryConfig: import("../types").AutocompleteQueryConfig): Promise<import("../types").AutocompleteResponseState>;
    onResultClick(params: any): void;
    onAutocompleteResultClick(params: any): void;
};
declare type SetupDriverOptions = {
    mockSearchResponse?: any;
    mockApiConnector?: APIConnector;
} & Partial<SearchDriverOptions>;
export declare const mockPlugin: {
    subscribe: jest.Mock<any, any>;
};
export declare function setupDriver({ mockSearchResponse, mockApiConnector, ...rest }?: SetupDriverOptions): {
    driver: SearchDriver;
    stateAfterCreation: any;
    updatedStateAfterAction: any;
    mockApiConnector: APIConnector;
};
export declare function doesStateHaveResponseData(response: any): boolean;
export declare function getSearchCalls(mockApiConnector: any): any;
export declare function getAutocompleteCalls(mockApiConnector: any): any;
export declare function getClickCalls(mockApiConnector: any): any;
export declare function getAutocompleteClickCalls(mockApiConnector: any): any;
/**
 * Returns a promise that resolves after the current event loop.
 *
 * Useful for writing `await waitATick()` to wait for a promise to resolve.
 */
export declare function waitATick(): Promise<unknown>;
export {};
