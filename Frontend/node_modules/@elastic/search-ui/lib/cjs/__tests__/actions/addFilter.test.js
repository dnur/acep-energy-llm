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
beforeEach(() => {
    MockedURLManager.mockClear();
});
describe("#addFilter", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    function subject(name, value, type, { initialFilters = [], initialState = {
        filters: initialFilters,
        current: null
    } } = {}) {
        const { driver, updatedStateAfterAction } = (0, helpers_1.setupDriver)({
            initialState
        });
        driver.addFilter(name, value, type);
        jest.runAllTimers();
        return updatedStateAfterAction.state;
    }
    (0, sharedTests_1.itFetchesResults)(() => subject("field", "value", undefined));
    (0, sharedTests_1.itUpdatesURLState)(URLManager_1.default, () => {
        subject("field", "value", undefined);
    });
    (0, sharedTests_1.itResetsCurrent)(() => subject("field", "value", undefined, {
        initialState: { filters: [], current: 2 }
    }));
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
    });
    it("Adds a new filter", () => {
        expect(subject("test", "value", undefined, {
            initialFilters: [{ field: "initial", values: ["value"], type: "all" }]
        }).filters).toEqual([
            { field: "initial", values: ["value"], type: "all" },
            { field: "test", values: ["value"], type: "all" }
        ]);
        expect(helpers_1.mockPlugin.subscribe).toBeCalledWith({
            field: "test",
            query: "",
            type: "FacetFilterSelected",
            value: "value"
        });
    });
    it("Adds an additional filter", () => {
        expect(subject("test", "value2", undefined, {
            initialFilters: [
                { field: "initial", values: ["value"], type: "all" },
                { field: "test", values: ["value"], type: "all" }
            ]
        }).filters).toEqual([
            { field: "initial", values: ["value"], type: "all" },
            { field: "test", values: ["value", "value2"], type: "all" }
        ]);
        expect(helpers_1.mockPlugin.subscribe).toBeCalledWith({
            field: "test",
            query: "",
            type: "FacetFilterSelected",
            value: "value,value2"
        });
    });
    it("Won't add a duplicate filter", () => {
        expect(subject("test", "value", undefined, {
            initialFilters: [
                { field: "initial", values: ["value"], type: "all" },
                { field: "test", values: ["value"], type: "all" }
            ]
        }).filters).toEqual([
            { field: "initial", values: ["value"], type: "all" },
            { field: "test", values: ["value"], type: "all" }
        ]);
    });
    it("Supports range filters", () => {
        expect(subject("test", {
            name: "test",
            from: 20,
            to: 100
        }, undefined, {
            initialFilters: [{ field: "initial", values: ["value"], type: "all" }]
        }).filters).toEqual([
            { field: "initial", values: ["value"], type: "all" },
            {
                field: "test",
                values: [{ name: "test", from: 20, to: 100 }],
                type: "all"
            }
        ]);
    });
    it("Adds an additional range filter", () => {
        expect(subject("test", { name: "test2", from: 5, to: 6 }, undefined, {
            initialFilters: [
                {
                    field: "initial",
                    values: [{ name: "test", from: 20, to: 100 }],
                    type: "all"
                },
                {
                    field: "test",
                    values: [{ name: "test", from: 4, to: 5 }],
                    type: "all"
                }
            ]
        }).filters).toEqual([
            {
                field: "initial",
                values: [{ name: "test", from: 20, to: 100 }],
                type: "all"
            },
            {
                field: "test",
                values: [
                    { name: "test", from: 4, to: 5 },
                    { name: "test2", from: 5, to: 6 }
                ],
                type: "all"
            }
        ]);
        expect(helpers_1.mockPlugin.subscribe).toBeCalledWith({
            field: "test",
            query: "",
            type: "FacetFilterSelected",
            value: "test,test2"
        });
    });
    it("Won't add a duplicate range filter", () => {
        expect(subject("test", {
            name: "test",
            from: 20,
            to: 100
        }, undefined, {
            initialFilters: [
                { field: "initial", values: ["value"], type: "all" },
                {
                    field: "test",
                    values: [{ name: "test", from: 20, to: 100 }],
                    type: "all"
                }
            ]
        }).filters).toEqual([
            { field: "initial", values: ["value"], type: "all" },
            {
                field: "test",
                values: [{ name: "test", from: 20, to: 100 }],
                type: "all"
            }
        ]);
    });
    it("Adds an 'any' type filter", () => {
        expect(subject("test", "value", "any").filters).toEqual([
            { field: "test", values: ["value"], type: "any" }
        ]);
    });
    it("Adds a 'none' type filter", () => {
        expect(subject("test", "value", "none").filters).toEqual([
            { field: "test", values: ["value"], type: "none" }
        ]);
    });
    it("Will maintain separate Filter structures for different filter types", () => {
        expect(subject("test", "value", "any", {
            initialFilters: [{ field: "test", values: ["value"], type: "all" }]
        }).filters).toEqual([
            { field: "test", values: ["value"], type: "all" },
            { field: "test", values: ["value"], type: "any" }
        ]);
    });
    it("Will add typed filters to the correct existing filter", () => {
        expect(subject("test", "value1", "any", {
            initialFilters: [
                { field: "test", values: ["value"], type: "all" },
                { field: "test", values: ["value"], type: "any" },
                { field: "test", values: ["value"], type: "none" }
            ]
        }).filters).toEqual([
            { field: "test", values: ["value"], type: "all" },
            { field: "test", values: ["value"], type: "none" },
            { field: "test", values: ["value", "value1"], type: "any" }
        ]);
    });
});
