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
describe("#setSort", () => {
    function subject(sort, sortDirection, { initialState = {} } = {}) {
        const { driver, stateAfterCreation, updatedStateAfterAction } = (0, helpers_1.setupDriver)({ initialState });
        driver.setSort(sort, sortDirection);
        jest.runAllTimers();
        return {
            state: updatedStateAfterAction.state,
            stateAfterCreation: stateAfterCreation
        };
    }
    (0, sharedTests_1.itUpdatesURLState)(URLManager_1.default, () => {
        subject("date", "desc");
    });
    it("Updates sortField in state", () => {
        expect(subject("date", "desc").state.sortField).toEqual("date");
    });
    it("Updates sortDirection in state", () => {
        expect(subject("date", "desc").state.sortDirection).toEqual("desc");
    });
    it("Updates sortList in state", () => {
        expect(subject([
            {
                field: "states",
                direction: "asc"
            },
            {
                field: "title",
                direction: "desc"
            }
        ]).state.sortList).toEqual([
            {
                field: "states",
                direction: "asc"
            },
            {
                field: "title",
                direction: "desc"
            }
        ]);
    });
    (0, sharedTests_1.itResetsCurrent)(() => subject("date", "desc", { initialState: { current: 2 } }).state);
    it("Does not update other Search Parameter values", () => {
        const initialState = {
            searchTerm: "test",
            filters: [{ field: "initial", values: ["value"], type: "all" }],
            resultsPerPage: 60
        };
        const { searchTerm, filters, resultsPerPage } = subject("date", "desc", {
            initialState
        }).state;
        expect({
            searchTerm,
            filters,
            resultsPerPage
        }).toEqual(initialState);
    });
});
