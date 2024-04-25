"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const view_helpers_1 = require("../../view-helpers");
const url_1 = __importDefault(require("core-js-pure/features/url"));
describe("getUrlSanitizer", () => {
    let url;
    let currentLocation;
    beforeEach(() => {
        url = "";
        currentLocation = "";
    });
    function subject() {
        return (0, view_helpers_1.getUrlSanitizer)(url_1.default, currentLocation)(url);
    }
    describe("when valid url with http", () => {
        beforeEach(() => {
            url = "http://www.example.com/";
            currentLocation = "http://www.mysite.com";
        });
        it("should allow it", () => {
            expect(subject()).toEqual(url);
        });
    });
    describe("when valid url with https", () => {
        beforeEach(() => {
            url = "https://www.example.com/";
            currentLocation = "http://www.mysite.com";
        });
        it("should allow it", () => {
            expect(subject()).toEqual(url);
        });
    });
    describe("when relative url", () => {
        beforeEach(() => {
            url = "/item/1234";
            currentLocation = "http://www.mysite.com";
        });
        it("should allow it", () => {
            expect(subject()).toEqual(url);
        });
    });
    describe("when the protocol is javascript", () => {
        beforeEach(() => {
            url = "javascript://test%0aalert(document.domain)";
            currentLocation = "http://www.mysite.com";
        });
        it("should disallow it", () => {
            expect(subject()).toEqual("");
        });
    });
    describe("when the protocol is javascript with spaces in it", () => {
        beforeEach(() => {
            url = "   javascript://test%0aalert(document.domain)";
            currentLocation = "http://www.mysite.com";
        });
        it("should disallow it", () => {
            expect(subject()).toEqual("");
        });
    });
    describe("when the url is invalid", () => {
        beforeEach(() => {
            url = "<div>My bad URL</div>";
            currentLocation = "http://www.mysite.com";
        });
        it("treats it as a relative url, which should still be safe", () => {
            expect(subject()).toEqual(url);
        });
    });
    describe("when the protocol is not whitelisted", () => {
        beforeEach(() => {
            url = "mailto://user@example.com";
            currentLocation = "http://www.mysite.com";
        });
        it("should disallow it", () => {
            expect(subject()).toEqual("");
        });
    });
    describe("when the url is protocol-less", () => {
        beforeEach(() => {
            url = "//www.example.com/";
            currentLocation = "https://www.mysite.com";
        });
        it("uses the protocol from the current location", () => {
            expect(subject()).toEqual(url);
        });
    });
});
