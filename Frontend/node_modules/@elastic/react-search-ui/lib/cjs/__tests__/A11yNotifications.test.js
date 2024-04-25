"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const A11yNotifications_1 = __importDefault(require("../A11yNotifications"));
it("outputs moreFilters correctly", () => {
    expect(A11yNotifications_1.default.moreFilters({
        visibleOptionsCount: 15,
        showingAll: false
    })).toEqual("15 options shown.");
    expect(A11yNotifications_1.default.moreFilters({
        visibleOptionsCount: 28,
        showingAll: true
    })).toEqual("All 28 options shown.");
});
