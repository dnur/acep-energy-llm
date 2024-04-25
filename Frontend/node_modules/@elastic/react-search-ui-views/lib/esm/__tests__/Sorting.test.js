import React from "react";
import Sorting from "../Sorting";
import { shallow } from "enzyme";
const requiredProps = {
    onChange: jest.fn(),
    options: [
        { label: "Name ASC", value: "name|||asc" },
        { label: "Name DESC", value: "name|||desc" }
    ],
    value: "name|||asc"
};
it("renders correctly when there is a value", () => {
    const wrapper = shallow(React.createElement(Sorting, Object.assign({}, requiredProps, { value: "name|||desc" })));
    expect(wrapper).toMatchSnapshot();
});
it("renders correctly when there is not a value", () => {
    const wrapper = shallow(React.createElement(Sorting, Object.assign({}, requiredProps)));
    expect(wrapper).toMatchSnapshot();
});
it("renders with className prop applied", () => {
    const customClassName = "test-class";
    const wrapper = shallow(React.createElement(Sorting, Object.assign({}, requiredProps, { className: customClassName })));
    const { className } = wrapper.props();
    expect(className).toEqual("sui-sorting test-class");
});
