"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const buildResponseAdapterOptions_1 = __importDefault(require("../buildResponseAdapterOptions"));
describe("buildResponseAdapterOptions", () => {
    describe("additionalFacetValueFields", () => {
        it("should extract additionalFacetValueFields for geo facets", () => {
            expect((0, buildResponseAdapterOptions_1.default)({
                facets: {
                    headquarters: {
                        center: "40.0374748, -76.3046049",
                        type: "range",
                        unit: "m",
                        ranges: [
                            { from: 0, to: 100, name: "Close" },
                            { from: 100, to: 500, name: "Far" }
                        ]
                    },
                    location: {
                        center: "40.0374748, -76.3046049",
                        type: "range",
                        unit: "mi",
                        ranges: [
                            { from: 0, to: 100, name: "Nearby" },
                            { from: 100, to: 500, name: "A longer drive." },
                            { from: 500, name: "Perhaps fly?" }
                        ]
                    },
                    acres: {
                        type: "range",
                        ranges: [
                            { from: -1, name: "Any" },
                            { from: 0, to: 1000, name: "Small" },
                            { from: 1001, to: 100000, name: "Medium" },
                            { from: 100001, name: "Large" }
                        ]
                    }
                }
            })).toEqual({
                additionalFacetValueFields: {
                    headquarters: {
                        center: "40.0374748, -76.3046049",
                        unit: "m"
                    },
                    location: {
                        center: "40.0374748, -76.3046049",
                        unit: "mi"
                    }
                }
            });
        });
        it("should not extract additionalFacetValueFields if there are no geo fields", () => {
            expect((0, buildResponseAdapterOptions_1.default)({
                facets: {
                    acres: {
                        type: "range",
                        ranges: [
                            { from: -1, name: "Any" },
                            { from: 0, to: 1000, name: "Small" },
                            { from: 1001, to: 100000, name: "Medium" },
                            { from: 100001, name: "Large" }
                        ]
                    }
                }
            })).toEqual({});
        });
    });
});
