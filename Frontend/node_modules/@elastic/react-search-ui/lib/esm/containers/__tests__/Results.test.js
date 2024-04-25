import React from "react";
import { shallow } from "enzyme";
import { ResultsContainer } from "../Results";
const params = {
    results: [
        {
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
        {
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
        }
    ],
    titleField: "title",
    urlField: "url"
};
it("supports a render prop", () => {
    const render = ({ children }) => {
        return React.createElement("div", null, children);
    };
    const wrapper = shallow(React.createElement(ResultsContainer, Object.assign({}, params, { view: render }))).dive();
    expect(wrapper).toMatchSnapshot();
});
it("passes through props to individual Result items", () => {
    const resultView = ({ result }) => {
        return React.createElement("li", null, result.title);
    };
    const wrapper = shallow(React.createElement(ResultsContainer, Object.assign({}, params, { resultView: resultView, shouldTrackClickThrough: true, clickThroughTags: ["whatever"] }))).dive();
    expect(wrapper.find("WithSearch").map((n) => n.props())).toEqual([
        {
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
            titleField: "title",
            urlField: "url",
            shouldTrackClickThrough: true,
            clickThroughTags: ["whatever"],
            view: resultView
        },
        {
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
            titleField: "title",
            urlField: "url",
            shouldTrackClickThrough: true,
            clickThroughTags: ["whatever"],
            view: resultView
        }
    ]);
});
it("passes className through to the view", () => {
    let viewProps;
    const className = "test-class";
    shallow(React.createElement(ResultsContainer, Object.assign({}, params, { className: className, view: (props) => {
            viewProps = props;
            return React.createElement("div", null);
        } }))).dive();
    expect(viewProps.className).toEqual(className);
});
it("passes data-foo through to the view", () => {
    let viewProps;
    const data = "bar";
    shallow(React.createElement(ResultsContainer, Object.assign({}, params, { "data-foo": data, view: (props) => {
            viewProps = props;
            return React.createElement("div", null);
        } }))).dive();
    expect(viewProps["data-foo"]).toEqual(data);
});
