import React from "react";
import { shallow } from "enzyme";
import LayoutSidebar from "../../layouts/LayoutSidebar";
it("renders correctly", () => {
    const wrapper = shallow(React.createElement(LayoutSidebar, { className: "sui-layout-sidebar" }, "Hello world!"));
    expect(wrapper).toMatchSnapshot();
});
it("renders toggled class based on state", () => {
    const wrapper = shallow(React.createElement(LayoutSidebar, { className: "sui-layout-sidebar" }, "Hello world!"));
    wrapper.setState({ isSidebarToggled: true });
    expect(wrapper.find(".sui-layout-sidebar--toggled")).toHaveLength(1);
});
it("updates isSidebarToggled state on button click", () => {
    const wrapper = shallow(React.createElement(LayoutSidebar, { className: "sui-layout-sidebar" }, "Hello world!"));
    expect(wrapper.state("isSidebarToggled")).toEqual(false);
    const buttons = wrapper.find(".sui-layout-sidebar-toggle");
    buttons.first().simulate("click");
    expect(wrapper.state("isSidebarToggled")).toEqual(true);
    buttons.last().simulate("click");
    expect(wrapper.state("isSidebarToggled")).toEqual(false);
});
