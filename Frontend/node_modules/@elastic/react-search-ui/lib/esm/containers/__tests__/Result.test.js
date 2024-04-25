import React, { useState } from "react";
import { shallow } from "enzyme";
import { ResultContainer } from "../Result";
const params = {
    result: {
        id: {
            raw: "id",
            snippet: "<em>id</em>"
        },
        title: {
            raw: "title",
            snippet: "<em>title</em>"
        },
        url: {
            raw: "url",
            snippet: "<em>url</em>"
        }
    },
    trackClickThrough: jest.fn(),
    titleField: "title",
    urlField: "url"
};
beforeEach(() => {
    params.trackClickThrough = jest.fn();
});
describe("link clicks", () => {
    it("will call back when a document link is clicked in the view", () => {
        let viewProps;
        const View = (props) => {
            viewProps = props;
            return React.createElement("div", null);
        };
        shallow(React.createElement(ResultContainer, Object.assign({}, params, { view: View }))).dive();
        const { onClickLink } = viewProps;
        onClickLink();
        const [id] = params.trackClickThrough.mock.calls[0];
        expect(id).toEqual("id");
    });
    it("will not call back when shouldTrackClickThrough is false", () => {
        let viewProps;
        const View = (props) => {
            viewProps = props;
            return React.createElement("div", null);
        };
        shallow(React.createElement(ResultContainer, Object.assign({}, params, { shouldTrackClickThrough: false, view: View }))).dive();
        const { onClickLink } = viewProps;
        onClickLink();
        expect(params.trackClickThrough.mock.calls.length).toEqual(0);
    });
    it("will pass through tags", () => {
        let viewProps;
        const View = (props) => {
            viewProps = props;
            return React.createElement("div", null);
        };
        shallow(React.createElement(ResultContainer, Object.assign({}, params, { clickThroughTags: ["whatever"], view: View }))).dive();
        const { onClickLink } = viewProps;
        onClickLink();
        const [id, tags] = params.trackClickThrough.mock.calls[0];
        expect(id).toEqual("id");
        expect(tags).toEqual(["whatever"]);
    });
});
it("passes className through to the view", () => {
    let viewProps;
    const View = (props) => {
        viewProps = props;
        return React.createElement("div", null);
    };
    const className = "test-class";
    shallow(React.createElement(ResultContainer, Object.assign({}, params, { className: className, view: View }))).dive();
    expect(viewProps.className).toEqual(className);
});
it("passes data-foo through to the view", () => {
    let viewProps;
    const View = (props) => {
        viewProps = props;
        return React.createElement("div", null);
    };
    const data = "bar";
    shallow(React.createElement(ResultContainer, Object.assign({}, params, { "data-foo": data, view: View }))).dive();
    expect(viewProps["data-foo"]).toEqual(data);
});
it("supports a render prop", () => {
    const render = ({ children }) => {
        return React.createElement("div", null, children);
    };
    const wrapper = shallow(React.createElement(ResultContainer, Object.assign({}, params, { view: render }))).dive();
    expect(wrapper).toMatchSnapshot();
});
describe("hooks support", () => {
    const MyResultView = () => {
        const [state] = useState(0);
        return React.createElement("div", null, state);
    };
    it("should allow hook to be used within a custom view component", () => {
        expect(() => {
            shallow(React.createElement(ResultContainer, Object.assign({}, params, { view: MyResultView })));
        }).not.toThrow();
        const wrapper = shallow(React.createElement(ResultContainer, Object.assign({}, params, { view: MyResultView }))).dive();
        expect(wrapper.find("div").text()).toBe("0");
    });
});
