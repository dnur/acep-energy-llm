"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const PagingInfo_1 = require("../PagingInfo");
const params = {
    pagingStart: 1,
    pagingEnd: 20,
    resultSearchTerm: "test",
    totalResults: 100
};
it("supports a render prop", () => {
    const render = ({ start, end }) => {
        return (react_1.default.createElement("div", null,
            start,
            end));
    };
    const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(PagingInfo_1.PagingInfoContainer, Object.assign({}, params, { view: render }))).dive();
    expect(wrapper).toMatchSnapshot();
});
it("renders when it doesn't have any results or a result search term", () => {
    const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(PagingInfo_1.PagingInfoContainer, Object.assign({}, Object.assign(Object.assign({}, params), { resultSearchTerm: "", results: [] })))).dive();
    expect(wrapper).toMatchSnapshot();
});
it("passes className through to the view", () => {
    let viewProps;
    const className = "test-class";
    (0, enzyme_1.shallow)(react_1.default.createElement(PagingInfo_1.PagingInfoContainer, Object.assign({}, params, { className: className, view: (props) => {
            viewProps = props;
            return react_1.default.createElement("div", null);
        } }))).dive();
    expect(viewProps.className).toEqual(className);
});
it("passes data-foo through to the view", () => {
    let viewProps;
    const data = "bar";
    (0, enzyme_1.shallow)(react_1.default.createElement(PagingInfo_1.PagingInfoContainer, Object.assign({}, params, { "data-foo": data, view: (props) => {
            viewProps = props;
            return react_1.default.createElement("div", null);
        } }))).dive();
    expect(viewProps["data-foo"]).toEqual(data);
});
