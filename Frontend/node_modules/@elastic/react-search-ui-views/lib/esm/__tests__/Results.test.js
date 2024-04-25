import React from "react";
import Results from "../Results";
import { shallow } from "enzyme";
it("renders correctly", () => {
    const wrapper = shallow(React.createElement(Results, null,
        React.createElement("div", null, "Children")));
    expect(wrapper).toMatchSnapshot();
});
it("renders with className prop applied", () => {
    const customClassName = "test-class";
    const wrapper = shallow(React.createElement(Results, { className: customClassName },
        React.createElement("div", null, "Children")));
    const { className } = wrapper.props();
    expect(className).toEqual("sui-results-container test-class");
});
