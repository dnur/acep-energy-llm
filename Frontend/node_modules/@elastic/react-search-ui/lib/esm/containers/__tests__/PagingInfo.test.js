import React from "react";
import { shallow } from "enzyme";
import { PagingInfoContainer } from "../PagingInfo";
const params = {
    pagingStart: 1,
    pagingEnd: 20,
    resultSearchTerm: "test",
    totalResults: 100
};
it("supports a render prop", () => {
    const render = ({ start, end }) => {
        return (React.createElement("div", null,
            start,
            end));
    };
    const wrapper = shallow(React.createElement(PagingInfoContainer, Object.assign({}, params, { view: render }))).dive();
    expect(wrapper).toMatchSnapshot();
});
it("renders when it doesn't have any results or a result search term", () => {
    const wrapper = shallow(React.createElement(PagingInfoContainer, Object.assign({}, Object.assign(Object.assign({}, params), { resultSearchTerm: "", results: [] })))).dive();
    expect(wrapper).toMatchSnapshot();
});
it("passes className through to the view", () => {
    let viewProps;
    const className = "test-class";
    shallow(React.createElement(PagingInfoContainer, Object.assign({}, params, { className: className, view: (props) => {
            viewProps = props;
            return React.createElement("div", null);
        } }))).dive();
    expect(viewProps.className).toEqual(className);
});
it("passes data-foo through to the view", () => {
    let viewProps;
    const data = "bar";
    shallow(React.createElement(PagingInfoContainer, Object.assign({}, params, { "data-foo": data, view: (props) => {
            viewProps = props;
            return React.createElement("div", null);
        } }))).dive();
    expect(viewProps["data-foo"]).toEqual(data);
});
