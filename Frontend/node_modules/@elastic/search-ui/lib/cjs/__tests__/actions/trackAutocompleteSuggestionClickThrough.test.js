"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../test/helpers");
describe("#trackAutocompleteSuggestionClickThrough", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    function subject({ initialState } = {}, documentId, tags) {
        const { driver, mockApiConnector, updatedStateAfterAction } = (0, helpers_1.setupDriver)({
            initialState
        });
        driver.setSearchTerm("terms", {
            autocompleteSuggestions: true
        });
        driver.state.autocompletedSuggestions = {
            test: [
                {
                    suggestion: "test"
                }
            ]
        };
        driver.trackAutocompleteSuggestionClickThrough("search terms", 1, tags);
        return { driver, mockApiConnector, updatedStateAfterAction };
    }
    it("Calls events plugin with correct parameters", () => {
        subject();
        expect(helpers_1.mockPlugin.subscribe).toBeCalledWith({
            position: 1,
            query: "terms",
            suggestion: "search terms",
            tags: [],
            type: "AutocompleteSuggestionSelected"
        });
    });
});
