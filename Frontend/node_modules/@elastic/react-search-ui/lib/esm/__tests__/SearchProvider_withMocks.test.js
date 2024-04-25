/*
This spec mocks useState, so is split out into a separate file than
SearchProvider.test.js
*/
import React, { useState } from "react";
jest.mock("react", () => {
    const original = jest.requireActual("react");
    return Object.assign(Object.assign({}, original), { useState: jest.fn() });
});
const useStateMock = useState;
import { mount } from "enzyme";
import { SearchProvider } from "../";
describe("SearchProvider", () => {
    const setState = jest.fn();
    beforeEach(() => {
        useStateMock.mockImplementation((init) => [init, setState]);
    });
    function getDriverFromComponentState() {
        return setState.mock.calls[setState.mock.calls.length - 1][0];
    }
    describe("merges default and custom a11yNotificationMessages", () => {
        const getA11yNotificationMessages = (a11yNotificationMessages) => {
            mount(React.createElement(SearchProvider, { config: { apiConnector: null, a11yNotificationMessages } }, "Test"));
            return getDriverFromComponentState().a11yNotificationMessages;
        };
        it("default messages", () => {
            const messages = getA11yNotificationMessages({});
            expect(messages.moreFilters({ visibleOptionsCount: 7 })).toEqual("7 options shown.");
        });
        it("override messages", () => {
            const messages = getA11yNotificationMessages({
                moreFilters: () => "Example override"
            });
            expect(messages.moreFilters()).toEqual("Example override");
        });
        it("new messages", () => {
            const messages = getA11yNotificationMessages({
                customMessage: () => "Hello world"
            });
            expect(messages.customMessage()).toEqual("Hello world");
        });
    });
});
