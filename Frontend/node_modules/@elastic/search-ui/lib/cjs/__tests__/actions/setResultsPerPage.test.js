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
describe("#setResultsPerPage", () => {
    function subject(resultsPerPage, { initialState = {} } = {}) {
        const { driver, stateAfterCreation, updatedStateAfterAction } = (0, helpers_1.setupDriver)({ initialState });
        driver.setResultsPerPage(resultsPerPage);
        jest.runAllTimers();
        return {
            state: updatedStateAfterAction.state,
            stateAfterCreation: stateAfterCreation
        };
    }
    it("Updates resultsPerPage in state", () => {
        expect(subject(10).state.resultsPerPage).toEqual(10);
    });
    (0, sharedTests_1.itUpdatesURLState)(URLManager_1.default, () => {
        subject(20);
    });
    (0, sharedTests_1.itResetsCurrent)(() => subject(20, { initialState: { current: 2 } }).state);
    it("Does not update other Search Parameter values", () => {
        const initialState = {
            searchTerm: "test",
            filters: [{ field: "initial", values: ["value"], type: "all" }],
            sortField: "date",
            sortDirection: "desc",
            sortList: [
                { direction: "asc", field: "name" },
                { direction: "desc", field: "title" }
            ]
        };
        const { searchTerm, filters, sortField, sortDirection, sortList } = subject(10, {
            initialState
        }).state;
        expect({
            searchTerm,
            filters,
            sortField,
            sortDirection,
            sortList
        }).toEqual(initialState);
    });
});
