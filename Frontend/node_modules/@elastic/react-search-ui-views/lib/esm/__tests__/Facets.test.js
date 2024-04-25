import React from "react";
import Facets from "../Facets";
import { shallow } from "enzyme";
it("renders correctly", () => {
    const wrapper = shallow(React.createElement(Facets, null,
        React.createElement("div", null, "Children")));
    expect(wrapper).toMatchSnapshot();
});
it("renders with className prop applied", () => {
    const customClassName = "test-class";
    const wrapper = shallow(React.createElement(Facets, { className: customClassName },
        React.createElement("div", null, "Children")));
    const { className } = wrapper.props();
    expect(className).toEqual("sui-facet-container test-class");
});
