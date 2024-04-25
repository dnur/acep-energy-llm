"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const LayoutSidebar_1 = __importDefault(require("../../layouts/LayoutSidebar"));
it("renders correctly", () => {
    const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(LayoutSidebar_1.default, { className: "sui-layout-sidebar" }, "Hello world!"));
    expect(wrapper).toMatchSnapshot();
});
it("renders toggled class based on state", () => {
    const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(LayoutSidebar_1.default, { className: "sui-layout-sidebar" }, "Hello world!"));
    wrapper.setState({ isSidebarToggled: true });
    expect(wrapper.find(".sui-layout-sidebar--toggled")).toHaveLength(1);
});
it("updates isSidebarToggled state on button click", () => {
    const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(LayoutSidebar_1.default, { className: "sui-layout-sidebar" }, "Hello world!"));
    expect(wrapper.state("isSidebarToggled")).toEqual(false);
    const buttons = wrapper.find(".sui-layout-sidebar-toggle");
    buttons.first().simulate("click");
    expect(wrapper.state("isSidebarToggled")).toEqual(true);
    buttons.last().simulate("click");
    expect(wrapper.state("isSidebarToggled")).toEqual(false);
});
