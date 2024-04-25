function wireUpEventHandler(handlerName, apiConnector, handlerParam) {
    if (handlerParam) {
        // Passes a 'next' parameter which allows a handler to work as
        // middleware for a connector
        if (apiConnector) {
            const next = apiConnector[handlerName].bind(apiConnector);
            return (...params) => {
                return handlerParam(...params, next);
            };
        }
        return handlerParam;
    }
    if (apiConnector && apiConnector[handlerName])
        return apiConnector[handlerName].bind(apiConnector);
    return () => {
        throw `No ${handlerName} handler provided and no Connector provided. You must configure one or the other.`;
    };
}
class Events {
    constructor({ apiConnector, onSearch, onAutocomplete, onResultClick, onAutocompleteResultClick, plugins = [] } = {}) {
        this.search = wireUpEventHandler("onSearch", apiConnector, onSearch);
        this.autocomplete = wireUpEventHandler("onAutocomplete", apiConnector, onAutocomplete);
        this.resultClick = wireUpEventHandler("onResultClick", apiConnector, onResultClick);
        this.autocompleteResultClick = wireUpEventHandler("onAutocompleteResultClick", apiConnector, onAutocompleteResultClick);
        this.plugins = plugins;
    }
    emit(event) {
        this.plugins.forEach((middleware) => {
            middleware.subscribe(event);
        });
    }
}
export default Events;
