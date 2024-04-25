import React from "react";
import { shallow } from "enzyme";
import { ErrorBoundaryContainer } from "../ErrorBoundary";
describe("Error Boundary", () => {
    const params = {
        children: React.createElement("div", null, "Child"),
        error: "I am an error"
    };
    let viewProps;
    const viewComponent = (props) => {
        viewProps = props;
        return React.createElement("div", null);
    };
    beforeEach(() => {
        viewProps = null;
    });
    it("supports a render prop", () => {
        const render = ({ error }) => {
            return React.createElement("div", null, error);
        };
        const wrapper = shallow(React.createElement(ErrorBoundaryContainer, Object.assign({}, params, { view: render }))).dive();
        expect(wrapper).toMatchSnapshot();
    });
    it("passes className through to the view", () => {
        const className = "test-class";
        shallow(React.createElement(ErrorBoundaryContainer, Object.assign({}, params, { className: className, view: viewComponent }))).dive();
        expect(viewProps.className).toEqual(className);
    });
    it("passes data-foo through to the view", () => {
        const data = "bar";
        shallow(React.createElement(ErrorBoundaryContainer, Object.assign({}, params, { "data-foo": data, view: viewComponent }))).dive();
        expect(viewProps["data-foo"]).toEqual(data);
    });
});
