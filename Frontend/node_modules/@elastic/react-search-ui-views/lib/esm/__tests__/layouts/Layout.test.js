import React from "react";
import { Layout } from "../..";
import { shallow } from "enzyme";
it("renders correctly", () => {
    const wrapper = shallow(React.createElement(Layout, { header: React.createElement("div", null, "Header"), sideContent: React.createElement("div", null,
            React.createElement("div", null, "Side Content")), bodyContent: React.createElement("div", null, "Body Content"), bodyHeader: React.createElement("div", null, "Body Header"), bodyFooter: React.createElement("div", null, "Body Footer") }));
    expect(wrapper).toMatchSnapshot();
});
it("will accept children instead of bodyContent", () => {
    const wrapper = shallow(React.createElement(Layout, { header: React.createElement("div", null, "Header"), sideContent: React.createElement("div", null,
            React.createElement("div", null, "Side Content")), bodyHeader: React.createElement("div", null, "Body Header"), bodyFooter: React.createElement("div", null, "Body Footer") },
        React.createElement("div", null, "Body Content")));
    expect(wrapper).toMatchSnapshot();
});
it("renders with className prop applied", () => {
    const wrapper = shallow(React.createElement(Layout, { className: "test-class" }));
    expect(wrapper.hasClass("test-class")).toBeTruthy();
});
