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
describe("#setCurrent", () => {
    function subject(current, { initialState = {} } = {}) {
        const { driver, stateAfterCreation, updatedStateAfterAction } = (0, helpers_1.setupDriver)({ initialState });
        driver.setCurrent(current);
        jest.runAllTimers();
        return {
            state: updatedStateAfterAction.state,
            stateAfterCreation: stateAfterCreation
        };
    }
    (0, sharedTests_1.itUpdatesURLState)(MockedURLManager, () => {
        subject(2);
    });
    it("Updates searchTerm in state", () => {
        expect(subject(2, { initialState: { searchTerm: "test" } }).state.current).toEqual(2);
    });
    it("Does not update other Search Parameter values", () => {
        const initialState = {
            searchTerm: "test",
            filters: [{ field: "initial", values: ["value"], type: "all" }],
            resultsPerPage: 60,
            sortField: "name",
            sortDirection: "asc",
            sortList: [
                { direction: "asc", field: "name" },
                { direction: "desc", field: "title" }
            ]
        };
        const { searchTerm, filters, resultsPerPage, sortField, sortList, sortDirection } = subject(2, {
            initialState
        }).state;
        expect({
            searchTerm,
            filters,
            resultsPerPage,
            sortField,
            sortList,
            sortDirection
        }).toEqual(initialState);
    });
});
