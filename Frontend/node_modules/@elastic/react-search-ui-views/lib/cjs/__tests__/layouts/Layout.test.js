"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const __1 = require("../..");
const enzyme_1 = require("enzyme");
it("renders correctly", () => {
    const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(__1.Layout, { header: react_1.default.createElement("div", null, "Header"), sideContent: react_1.default.createElement("div", null,
            react_1.default.createElement("div", null, "Side Content")), bodyContent: react_1.default.createElement("div", null, "Body Content"), bodyHeader: react_1.default.createElement("div", null, "Body Header"), bodyFooter: react_1.default.createElement("div", null, "Body Footer") }));
    expect(wrapper).toMatchSnapshot();
});
it("will accept children instead of bodyContent", () => {
    const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(__1.Layout, { header: react_1.default.createElement("div", null, "Header"), sideContent: react_1.default.createElement("div", null,
            react_1.default.createElement("div", null, "Side Content")), bodyHeader: react_1.default.createElement("div", null, "Body Header"), bodyFooter: react_1.default.createElement("div", null, "Body Footer") },
        react_1.default.createElement("div", null, "Body Content")));
    expect(wrapper).toMatchSnapshot();
});
it("renders with className prop applied", () => {
    const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(__1.Layout, { className: "test-class" }));
    expect(wrapper.hasClass("test-class")).toBeTruthy();
});
