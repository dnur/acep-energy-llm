"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../test/helpers");
const sharedTests_1 = require("../../test/sharedTests");
// We mock this so no state is actually written to the URL
jest.mock("../../URLManager");
const URLManager_1 = __importDefault(require("../../URLManager"));
const MockedURLManager = jest.mocked(URLManager_1.default, true);
describe("#setFilter", () => {
    beforeEach(() => {
        MockedURLManager.mockClear();
        jest.clearAllMocks();
    });
    function subject(name, value, type, { initialFilters = [], initialState = {
        filters: initialFilters
    } } = {}) {
        const { driver, updatedStateAfterAction } = (0, helpers_1.setupDriver)({
            initialState
        });
        driver.setFilter(name, value, type);
        jest.runAllTimers();
        return updatedStateAfterAction.state;
    }
    (0, sharedTests_1.itUpdatesURLState)(URLManager_1.default, () => {
        subject(2);
    });
    (0, sharedTests_1.itFetchesResults)(() => subject("field", "value"));
    (0, sharedTests_1.itResetsCurrent)(() => subject("field", "value", undefined, { initialState: { current: 2 } }));
    it("Does not update other Search Parameter values", () => {
        const initialState = {
            resultsPerPage: 60,
            sortField: "name",
            sortDirection: "asc",
            sortList: [
                { direction: "asc", field: "name" },
                { direction: "desc", field: "title" }
            ],
            searchTerm: "test"
        };
        const { resultsPerPage, sortField, sortDirection, sortList, searchTerm } = subject("field", "value", undefined, { initialState });
        expect({
            resultsPerPage,
            sortField,
            sortDirection,
            sortList,
            searchTerm
        }).toEqual(initialState);
        expect(helpers_1.mockPlugin.subscribe).toHaveBeenCalledWith({
            field: "field",
            value: "value",
            query: "test",
            type: "FacetFilterSelected"
        });
    });
    it("Adds a new filter and removes old filters", () => {
        expect(subject("test", "value2", undefined, {
            initialFilters: [
                { field: "initial", values: ["value"], type: "all" },
                { field: "test", values: ["value1"], type: "all" }
            ]
        }).filters).toEqual([
            { field: "initial", values: ["value"], type: "all" },
            { field: "test", values: ["value2"], type: "all" }
        ]);
        expect(helpers_1.mockPlugin.subscribe).toHaveBeenCalledWith({
            field: "test",
            value: "value2",
            query: "",
            type: "FacetFilterSelected"
        });
    });
    it("Adds an 'any' type filter", () => {
        expect(subject("test", "value", "any").filters).toEqual([
            { field: "test", values: ["value"], type: "any" }
        ]);
        expect(helpers_1.mockPlugin.subscribe).toHaveBeenCalledWith({
            field: "test",
            value: "value",
            query: "",
            type: "FacetFilterSelected"
        });
    });
    it("Adds a 'none' type filter", () => {
        expect(subject("test", "value", "none").filters).toEqual([
            { field: "test", values: ["value"], type: "none" }
        ]);
        expect(helpers_1.mockPlugin.subscribe).toHaveBeenCalledWith({
            field: "test",
            value: "value",
            query: "",
            type: "FacetFilterSelected"
        });
    });
    it("Will maintain separate Filter structures for different filter types", () => {
        expect(subject("test", "value", "any", {
            initialFilters: [{ field: "test", values: ["value"], type: "all" }]
        }).filters).toEqual([
            { field: "test", values: ["value"], type: "all" },
            { field: "test", values: ["value"], type: "any" }
        ]);
    });
    it("Will remove the correct typed filter", () => {
        expect(subject("test", "value1", "any", {
            initialFilters: [
                { field: "test", values: ["value"], type: "all" },
                { field: "test", values: ["value"], type: "any" },
                { field: "test", values: ["value"], type: "none" }
            ]
        }).filters).toEqual([
            { field: "test", values: ["value"], type: "all" },
            { field: "test", values: ["value"], type: "none" },
            { field: "test", values: ["value1"], type: "any" }
        ]);
    });
});
