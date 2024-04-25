import React from "react";
import BooleanFacet from "../BooleanFacet";
import { shallow, mount } from "enzyme";
const params = {
    label: "A Facet",
    onRemove: jest.fn(),
    onChange: jest.fn(),
    onMoreClick: jest.fn(),
    onSearch: jest.fn(),
    onSelect: jest.fn(),
    searchPlaceholder: "Search",
    showMore: false,
    showSearch: false,
    options: [
        {
            value: "true",
            count: 10
        }
    ],
    values: []
};
it("renders", () => {
    const wrapper = shallow(React.createElement(BooleanFacet, Object.assign({}, params)));
    expect(wrapper).toMatchSnapshot();
});
it("renders with className prop applied", () => {
    const customClassName = "test-class";
    const wrapper = shallow(React.createElement(BooleanFacet, Object.assign({ className: customClassName }, params)));
    const { className } = wrapper.props();
    expect(className.includes(customClassName)).toBe(true);
});
it("onChange is called on click", () => {
    const wrapper = mount(React.createElement(BooleanFacet, Object.assign({}, params)));
    wrapper.find("input").simulate("change");
    expect(params.onChange).toHaveBeenCalledTimes(1);
});
it("onRemove is called on click", () => {
    const wrapper = mount(React.createElement(BooleanFacet, Object.assign({}, Object.assign(Object.assign({}, params), { values: ["true"] }))));
    wrapper.find("input").simulate("change");
    expect(params.onRemove).toHaveBeenCalledTimes(1);
});
it("will not render when there are no true options", () => {
    params.options = [];
    const wrapper = shallow(React.createElement(BooleanFacet, Object.assign({}, params)));
    expect(wrapper).toMatchSnapshot();
});
