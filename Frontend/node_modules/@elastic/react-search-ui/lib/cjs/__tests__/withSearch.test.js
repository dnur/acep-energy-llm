"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable jest/no-focused-tests */
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const __1 = require("..");
const __2 = require("..");
const search_ui_1 = require("@elastic/search-ui");
describe("withSearch", () => {
    let mockDriver;
    beforeEach(() => {
        mockDriver = new search_ui_1.SearchDriver({ apiConnector: null });
        mockDriver.state = Object.assign(Object.assign({}, mockDriver.state), { searchTerm: "a search term", resultSearchTerm: "another search term" });
        jest.spyOn(mockDriver.actions, "setSearchTerm");
        jest.spyOn(mockDriver, "subscribeToStateChanges");
        jest.spyOn(mockDriver, "unsubscribeToStateChanges");
    });
    describe("driver subscription", () => {
        function setup(mapContextToProps) {
            const Component = (0, __2.withSearch)(mapContextToProps)(({ searchTerm }) => {
                return react_1.default.createElement("div", null, searchTerm);
            });
            const wrapper = (0, enzyme_1.mount)(react_1.default.createElement(__1.SearchContext.Provider, { value: { driver: mockDriver } },
                react_1.default.createElement(Component, null)));
            return {
                wrapper,
                Component
            };
        }
        it("will subscribe to state updates", () => {
            const { wrapper } = setup((c) => c);
            mockDriver.getActions().setSearchTerm("New Term");
            expect(wrapper.text()).toEqual("New Term");
        });
        it("will maintain action properties on state updates when mapContextToProps parameter is passed", () => {
            const { wrapper } = setup(({ searchTerm, setSearchTerm }) => ({
                searchTerm,
                setSearchTerm
            }));
            mockDriver.getActions().setSearchTerm("New Term");
            expect(wrapper.text()).toEqual("New Term");
        });
        it("will unsubsribe on unmount", () => {
            console.error = jest.fn();
            const { wrapper } = setup(({ searchTerm, setSearchTerm }) => ({
                searchTerm,
                setSearchTerm
            }));
            expect(mockDriver.subscriptions).toHaveLength(1);
            wrapper.unmount();
            expect(mockDriver.unsubscribeToStateChanges).toHaveBeenCalledTimes(1);
            expect(mockDriver.subscriptions).toHaveLength(0);
            mockDriver.getActions().setSearchTerm("New Term");
            expect(console.error).not.toBeCalled();
        });
    });
    describe("mapContextToProps", () => {
        function setup(mapContextToProps) {
            const Component = (0, __2.withSearch)(mapContextToProps)(({ searchTerm, resultSearchTerm, setSearchTerm, clap }) => {
                return (react_1.default.createElement("div", null,
                    searchTerm,
                    resultSearchTerm,
                    setSearchTerm && setSearchTerm.name,
                    clap));
            });
            return (0, enzyme_1.mount)(react_1.default.createElement(__1.SearchContext.Provider, { value: { driver: mockDriver } },
                react_1.default.createElement(Component, { prop1: "prop 1 value" })));
        }
        it("will inject specified state", () => {
            const element = setup(({ searchTerm }) => ({ searchTerm }));
            expect(element.text()).toEqual("a search term");
        });
        it("will inject a specified action", () => {
            const element = setup(({ setSearchTerm }) => ({ setSearchTerm }));
            expect(element.text()).toEqual("mockConstructor");
        });
        it("will not inject an  unspecified state", () => {
            const element = setup(({ resultSearchTerm }) => ({ resultSearchTerm }));
            expect(element.text()).toEqual("another search term");
        });
        it("will inject arbitrary state", () => {
            const element = setup(() => ({ clap: "your hands" }));
            expect(element.text()).toEqual("your hands");
        });
        it("will error if nothing is passed", () => {
            expect(() => setup()).toThrow();
        });
        it("will inject nothing if the function injects nothing", () => {
            const element = setup(() => ({}));
            expect(element.text()).toEqual("");
        });
        it("accepts the current props as a second parameter", () => {
            const element = setup((_, { prop1 }) => ({ searchTerm: prop1 }));
            expect(element.text()).toEqual("prop 1 value");
        });
        it("will use mapContextToProps on state update", () => {
            const element = setup(({ searchTerm }) => ({
                searchTerm: searchTerm + " (updated)"
            }));
            mockDriver.getActions().setSearchTerm("a new search term");
            expect(element.text()).toEqual("a new search term (updated)");
        });
    });
    describe("mapContextToProps override", () => {
        function setup(initialMapContextToProps, mapContextToProps) {
            const Component = (0, __2.withSearch)(initialMapContextToProps)(({ clap, searchTerm }) => {
                return (react_1.default.createElement("div", null,
                    searchTerm,
                    clap));
            });
            return (0, enzyme_1.mount)(react_1.default.createElement(__1.SearchContext.Provider, { value: { driver: mockDriver } },
                react_1.default.createElement(Component, { mapContextToProps: mapContextToProps })));
        }
        it("should allow a component level prop that overrides mapContextToProps from setup", () => {
            const element = setup(() => {
                return {
                    clap: "your hands"
                };
            }, ({ searchTerm }) => {
                return {
                    searchTerm: searchTerm + " is now modified"
                };
            });
            expect(element.text()).toEqual("a search term is now modified");
        });
        it("will use the mapContextToProps override on state update", () => {
            const element = setup(() => ({}), ({ searchTerm }) => ({
                searchTerm: searchTerm + " (updated)"
            }));
            mockDriver.getActions().setSearchTerm("a new search term");
            expect(element.text()).toEqual("a new search term (updated)");
        });
    });
});
