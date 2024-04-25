"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SearchDriver_1 = require("../../SearchDriver");
const helpers_1 = require("../../test/helpers");
const sharedTests_1 = require("../../test/sharedTests");
// We mock this so no state is actually written to the URL
jest.mock("../../URLManager");
const URLManager_1 = __importDefault(require("../../URLManager"));
const MockedURLManager = jest.mocked(URLManager_1.default, true);
beforeEach(() => {
    MockedURLManager.mockClear();
});
describe("#reset", () => {
    function subject({ initialState = {
        resultsPerPage: 60,
        sortField: "name",
        sortDirection: "asc",
        sortList: [
            { direction: "asc", field: "name" },
            { direction: "desc", field: "title" }
        ]
    } } = {}) {
        const { driver, updatedStateAfterAction } = (0, helpers_1.setupDriver)({
            initialState
        });
        driver.setSearchTerm("test");
        const updatedStated = updatedStateAfterAction.state;
        // Because we only want to know if it was called AFTER reset is called
        MockedURLManager.mock.instances[0].pushStateToURL.mockClear();
        expect(updatedStated).not.toEqual(Object.assign(Object.assign({}, SearchDriver_1.DEFAULT_STATE), initialState));
        driver.reset();
        return updatedStateAfterAction.state;
    }
    it("Resets state back to the initial state provided at initialization", () => {
        const initialState = {
            resultsPerPage: 60,
            sortField: "name",
            sortDirection: "asc",
            sortList: [
                { direction: "asc", field: "name" },
                { direction: "desc", field: "title" }
            ]
        };
        expect(subject({ initialState })).toEqual(Object.assign(Object.assign({}, SearchDriver_1.DEFAULT_STATE), initialState));
    });
    (0, sharedTests_1.itUpdatesURLState)(URLManager_1.default, () => {
        subject();
    });
});
