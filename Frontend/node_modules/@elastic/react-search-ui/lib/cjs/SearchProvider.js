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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const search_ui_1 = require("@elastic/search-ui");
const SearchContext_1 = __importDefault(require("./SearchContext"));
const A11yNotifications_1 = __importDefault(require("./A11yNotifications"));
/**
 * The SearchProvider primarily holds a reference to the SearchDriver and
 * exposes it to the rest of the application in a Context.
 */
const SearchProvider = ({ children, config, driver }) => {
    const [driverInstance, setDriverInstance] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        // This initialization is done inside of useEffect, because initializing the SearchDriver server side
        // will error out, since the driver depends on window. Placing the initialization inside of useEffect
        // assures that it won't attempt to initialize server side.
        const currentDriver = driver ||
            new search_ui_1.SearchDriver(Object.assign(Object.assign({}, config), { a11yNotificationMessages: Object.assign(Object.assign({}, A11yNotifications_1.default), config.a11yNotificationMessages) }));
        setDriverInstance(currentDriver);
        return () => {
            currentDriver.tearDown();
        };
    }, []);
    // This effect allows users to dynamically update their searchQuery without re-mounting a SearchProvider,
    // which would be destructive. An example of why this is useful is dynamically updating facets.
    (0, react_1.useEffect)(() => {
        if (driverInstance) {
            driverInstance.setSearchQuery(config.searchQuery);
        }
    }, [config.searchQuery]);
    (0, react_1.useEffect)(() => {
        if (driverInstance) {
            driverInstance.setAutocompleteQuery(config.autocompleteQuery);
        }
    }, [config.autocompleteQuery]);
    // Since driver is initialized in useEffect above, we are waiting
    // to render until the driver is available.
    if (!driverInstance)
        return null;
    // Passing the entire "this.state" to the Context is significant. Because
    // Context determines when to re-render based on referential identity
    // something like this could cause unnecessary renders:
    //
    // <SearchContext.Provider value={{driver: this.state.driver}}>
    //
    // By passing the entire state, we ensure that re-renders only occur when
    // state is actually updated.
    const contextValue = {
        driver: driverInstance
    };
    return (react_1.default.createElement(SearchContext_1.default.Provider, { value: contextValue }, children));
};
exports.default = SearchProvider;
