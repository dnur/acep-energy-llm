"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const __1 = require("..");
const search_ui_1 = require("@elastic/search-ui");
it("Should be a context", () => {
    const searchDriver = new search_ui_1.SearchDriver({
        apiConnector: null
    });
    searchDriver.state.searchTerm = "a search term";
    const value = (0, enzyme_1.mount)(react_1.default.createElement(__1.SearchContext.Provider, { value: { driver: searchDriver } },
        react_1.default.createElement(__1.SearchContext.Consumer, null, ({ driver }) => react_1.default.createElement("div", null, driver.state.searchTerm))));
    expect(value.text()).toBe("a search term");
});
