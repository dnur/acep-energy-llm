import React from "react";
import ErrorBoundary from "../ErrorBoundary";
import { shallow } from "enzyme";
const params = {
    children: React.createElement("div", null, "Child"),
    error: "I am an error"
};
it("renders an error when there is an error", () => {
    const wrapper = shallow(React.createElement(ErrorBoundary, Object.assign({}, params)));
    expect(wrapper).toMatchSnapshot();
});
it("renders children when there is no error", () => {
    const wrapper = shallow(React.createElement(ErrorBoundary, Object.assign({}, Object.assign(Object.assign({}, params), { error: "" }))));
    expect(wrapper).toMatchSnapshot();
});
it("renders with className prop applied", () => {
    const customClassName = "test-class";
    const wrapper = shallow(React.createElement(ErrorBoundary, Object.assign({ className: customClassName }, params)));
    const { className } = wrapper.props();
    expect(className).toEqual("sui-search-error test-class");
});
