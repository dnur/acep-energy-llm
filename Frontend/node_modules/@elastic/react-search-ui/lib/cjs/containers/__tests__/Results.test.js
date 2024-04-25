"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const Results_1 = require("../Results");
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
        return react_1.default.createElement("div", null, children);
    };
    const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(Results_1.ResultsContainer, Object.assign({}, params, { view: render }))).dive();
    expect(wrapper).toMatchSnapshot();
});
it("passes through props to individual Result items", () => {
    const resultView = ({ result }) => {
        return react_1.default.createElement("li", null, result.title);
    };
    const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(Results_1.ResultsContainer, Object.assign({}, params, { resultView: resultView, shouldTrackClickThrough: true, clickThroughTags: ["whatever"] }))).dive();
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
    (0, enzyme_1.shallow)(react_1.default.createElement(Results_1.ResultsContainer, Object.assign({}, params, { className: className, view: (props) => {
            viewProps = props;
            return react_1.default.createElement("div", null);
        } }))).dive();
    expect(viewProps.className).toEqual(className);
});
it("passes data-foo through to the view", () => {
    let viewProps;
    const data = "bar";
    (0, enzyme_1.shallow)(react_1.default.createElement(Results_1.ResultsContainer, Object.assign({}, params, { "data-foo": data, view: (props) => {
            viewProps = props;
            return react_1.default.createElement("div", null);
        } }))).dive();
    expect(viewProps["data-foo"]).toEqual(data);
});
