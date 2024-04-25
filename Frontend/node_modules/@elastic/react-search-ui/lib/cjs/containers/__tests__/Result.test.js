"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const enzyme_1 = require("enzyme");
const Result_1 = require("../Result");
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
            return react_1.default.createElement("div", null);
        };
        (0, enzyme_1.shallow)(react_1.default.createElement(Result_1.ResultContainer, Object.assign({}, params, { view: View }))).dive();
        const { onClickLink } = viewProps;
        onClickLink();
        const [id] = params.trackClickThrough.mock.calls[0];
        expect(id).toEqual("id");
    });
    it("will not call back when shouldTrackClickThrough is false", () => {
        let viewProps;
        const View = (props) => {
            viewProps = props;
            return react_1.default.createElement("div", null);
        };
        (0, enzyme_1.shallow)(react_1.default.createElement(Result_1.ResultContainer, Object.assign({}, params, { shouldTrackClickThrough: false, view: View }))).dive();
        const { onClickLink } = viewProps;
        onClickLink();
        expect(params.trackClickThrough.mock.calls.length).toEqual(0);
    });
    it("will pass through tags", () => {
        let viewProps;
        const View = (props) => {
            viewProps = props;
            return react_1.default.createElement("div", null);
        };
        (0, enzyme_1.shallow)(react_1.default.createElement(Result_1.ResultContainer, Object.assign({}, params, { clickThroughTags: ["whatever"], view: View }))).dive();
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
        return react_1.default.createElement("div", null);
    };
    const className = "test-class";
    (0, enzyme_1.shallow)(react_1.default.createElement(Result_1.ResultContainer, Object.assign({}, params, { className: className, view: View }))).dive();
    expect(viewProps.className).toEqual(className);
});
it("passes data-foo through to the view", () => {
    let viewProps;
    const View = (props) => {
        viewProps = props;
        return react_1.default.createElement("div", null);
    };
    const data = "bar";
    (0, enzyme_1.shallow)(react_1.default.createElement(Result_1.ResultContainer, Object.assign({}, params, { "data-foo": data, view: View }))).dive();
    expect(viewProps["data-foo"]).toEqual(data);
});
it("supports a render prop", () => {
    const render = ({ children }) => {
        return react_1.default.createElement("div", null, children);
    };
    const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(Result_1.ResultContainer, Object.assign({}, params, { view: render }))).dive();
    expect(wrapper).toMatchSnapshot();
});
describe("hooks support", () => {
    const MyResultView = () => {
        const [state] = (0, react_1.useState)(0);
        return react_1.default.createElement("div", null, state);
    };
    it("should allow hook to be used within a custom view component", () => {
        expect(() => {
            (0, enzyme_1.shallow)(react_1.default.createElement(Result_1.ResultContainer, Object.assign({}, params, { view: MyResultView })));
        }).not.toThrow();
        const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(Result_1.ResultContainer, Object.assign({}, params, { view: MyResultView }))).dive();
        expect(wrapper.find("div").text()).toBe("0");
    });
});
