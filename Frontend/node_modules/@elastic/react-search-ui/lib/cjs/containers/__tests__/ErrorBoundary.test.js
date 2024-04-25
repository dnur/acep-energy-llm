"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const ErrorBoundary_1 = require("../ErrorBoundary");
describe("Error Boundary", () => {
    const params = {
        children: react_1.default.createElement("div", null, "Child"),
        error: "I am an error"
    };
    let viewProps;
    const viewComponent = (props) => {
        viewProps = props;
        return react_1.default.createElement("div", null);
    };
    beforeEach(() => {
        viewProps = null;
    });
    it("supports a render prop", () => {
        const render = ({ error }) => {
            return react_1.default.createElement("div", null, error);
        };
        const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(ErrorBoundary_1.ErrorBoundaryContainer, Object.assign({}, params, { view: render }))).dive();
        expect(wrapper).toMatchSnapshot();
    });
    it("passes className through to the view", () => {
        const className = "test-class";
        (0, enzyme_1.shallow)(react_1.default.createElement(ErrorBoundary_1.ErrorBoundaryContainer, Object.assign({}, params, { className: className, view: viewComponent }))).dive();
        expect(viewProps.className).toEqual(className);
    });
    it("passes data-foo through to the view", () => {
        const data = "bar";
        (0, enzyme_1.shallow)(react_1.default.createElement(ErrorBoundary_1.ErrorBoundaryContainer, Object.assign({}, params, { "data-foo": data, view: viewComponent }))).dive();
        expect(viewProps["data-foo"]).toEqual(data);
    });
});
