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
describe("#clearFilters", () => {
    function subject(except, { initialFilters = [], initialState = {
        filters: initialFilters
    } } = {}) {
        const { driver, updatedStateAfterAction } = (0, helpers_1.setupDriver)({
            initialState
        });
        driver.clearFilters(except);
        jest.runAllTimers();
        return updatedStateAfterAction.state;
    }
    (0, sharedTests_1.itResetsCurrent)(() => subject(null, { initialState: { current: 2 } }));
    (0, sharedTests_1.itUpdatesURLState)(URLManager_1.default, () => {
        subject();
    });
    it("Does not update other Search Parameter values", () => {
        const initialState = {
            resultsPerPage: 60,
            sortField: "name",
            sortDirection: "asc",
            sortList: [
                { field: "name", direction: "asc" },
                { field: "title", direction: "desc" }
            ],
            searchTerm: "test"
        };
        const { resultsPerPage, sortField, sortDirection, sortList, searchTerm } = subject(null, { initialState });
        expect({
            resultsPerPage,
            sortField,
            sortDirection,
            sortList,
            searchTerm
        }).toEqual(initialState);
    });
    it("Removes all filters", () => {
        expect(subject([], {
            initialFilters: [
                { field: "initial", values: ["value"], type: "all" },
                {
                    field: "test",
                    values: ["anotherValue", "value", "someOtherValue"],
                    type: "all"
                }
            ]
        }).filters).toEqual([]);
    });
    it("Removes all except the filters listed in 'except'", () => {
        expect(subject(["initial"], {
            initialFilters: [
                { field: "initial", values: ["value"], type: "all" },
                {
                    field: "test",
                    values: ["anotherValue", "value", "someOtherValue"],
                    type: "all"
                }
            ]
        }).filters).toEqual([{ field: "initial", values: ["value"], type: "all" }]);
    });
});
