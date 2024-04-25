"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const ResultsPerPage_1 = require("../ResultsPerPage");
const params = {
    results: [{}, {}],
    resultsPerPage: 20,
    searchTerm: "test",
    setResultsPerPage: jest.fn()
};
beforeEach(() => {
    params.setResultsPerPage = jest.fn();
});
it("supports a render prop", () => {
    const render = ({ value }) => {
        return react_1.default.createElement("div", null, value);
    };
    const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(ResultsPerPage_1.ResultsPerPageContainer, Object.assign({}, params, { view: render }))).dive();
    expect(wrapper).toMatchSnapshot();
});
it("renders when it doesn't have any results or a search term", () => {
    const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(ResultsPerPage_1.ResultsPerPageContainer, Object.assign({}, Object.assign(Object.assign({}, params), { searchTerm: "", results: [] })))).dive();
    expect(wrapper).toMatchSnapshot();
});
it("will call back when a selection is made in the view", () => {
    let viewProps;
    (0, enzyme_1.shallow)(react_1.default.createElement(ResultsPerPage_1.ResultsPerPageContainer, Object.assign({}, params, { view: (props) => {
            viewProps = props;
            return react_1.default.createElement("div", null);
        } }))).dive();
    const { onChange } = viewProps;
    onChange(40);
    const resultsPerPage = params.setResultsPerPage.mock.calls[0][0];
    expect(resultsPerPage).toEqual(40);
});
it("passes className through to the view", () => {
    let viewProps;
    const className = "test-class";
    (0, enzyme_1.shallow)(react_1.default.createElement(ResultsPerPage_1.ResultsPerPageContainer, Object.assign({}, params, { className: className, view: (props) => {
            viewProps = props;
            return react_1.default.createElement("div", null);
        } }))).dive();
    expect(viewProps.className).toEqual(className);
});
it("renders the component with custom page options", () => {
    const options = [5, 10, 15];
    const resultsPerPage = 10;
    const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(ResultsPerPage_1.ResultsPerPageContainer, Object.assign({}, Object.assign(Object.assign({}, params), { resultsPerPage, options })))).dive();
    expect(wrapper).toMatchSnapshot();
});
it("passes data-foo through to the view", () => {
    let viewProps;
    const data = "bar";
    (0, enzyme_1.shallow)(react_1.default.createElement(ResultsPerPage_1.ResultsPerPageContainer, Object.assign({}, params, { "data-foo": data, view: (props) => {
            viewProps = props;
            return react_1.default.createElement("div", null);
        } }))).dive();
    expect(viewProps["data-foo"]).toEqual(data);
});
