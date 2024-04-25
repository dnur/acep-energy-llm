"use strict";
/*
This spec mocks useState, so is split out into a separate file than
SearchProvider.test.js
*/
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
jest.mock("react", () => {
    const original = jest.requireActual("react");
    return Object.assign(Object.assign({}, original), { useState: jest.fn() });
});
const useStateMock = react_1.useState;
const enzyme_1 = require("enzyme");
const __1 = require("../");
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
            (0, enzyme_1.mount)(react_1.default.createElement(__1.SearchProvider, { config: { apiConnector: null, a11yNotificationMessages } }, "Test"));
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
