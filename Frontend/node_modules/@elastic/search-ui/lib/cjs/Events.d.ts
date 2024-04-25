import { onAutocompleteHook, onAutocompleteResultClickHook, onResultClickHook, onSearchHook } from "./SearchDriver";
import { APIConnector, AutocompleteQueryConfig, QueryConfig, SearchQuery, AutocompleteSearchQuery, ResponseState, AutocompleteResponseState, Event, Plugin } from "./types";
declare type EventOptions = {
    apiConnector?: APIConnector;
    onSearch?: onSearchHook;
    onAutocomplete?: onAutocompleteHook;
    onResultClick?: onResultClickHook;
    onAutocompleteResultClick?: onAutocompleteResultClickHook;
    plugins?: Plugin[];
};
declare class Events {
    search: (query: SearchQuery, queryConfig: QueryConfig) => Promise<ResponseState>;
    autocomplete: (query: AutocompleteSearchQuery, queryConfig: AutocompleteQueryConfig) => Promise<AutocompleteResponseState>;
    resultClick: (resultParams: any) => void;
    autocompleteResultClick: (resultParams: any) => void;
    private plugins;
    constructor({ apiConnector, onSearch, onAutocomplete, onResultClick, onAutocompleteResultClick, plugins }?: EventOptions);
    emit(event: Event): void;
}
export default Events;
