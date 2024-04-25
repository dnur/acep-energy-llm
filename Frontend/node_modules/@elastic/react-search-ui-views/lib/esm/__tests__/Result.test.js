import React from "react";
import Result from "../Result";
import { shallow } from "enzyme";
const TITLE_FIELD = "title";
const URL_FIELD = "url";
const TITLE_RESULT_VALUE = "Title";
const URL_RESULT_VALUE = "http://www.example.com";
const ARBITRARY_FIELD = { _meta: "data" };
const requiredProps = {
    result: { field: { raw: "value" } },
    onClickLink: () => ({})
};
it("renders correctly when there is not a URL or title", () => {
    const wrapper = shallow(React.createElement(Result, Object.assign({}, requiredProps)));
    expect(wrapper).toMatchSnapshot();
});
it("renders correctly when there is a title", () => {
    const wrapper = shallow(React.createElement(Result, Object.assign({}, Object.assign(Object.assign({}, requiredProps), { result: Object.assign(Object.assign({}, requiredProps.result), { [TITLE_FIELD]: { raw: TITLE_RESULT_VALUE } }), titleField: TITLE_FIELD }))));
    expect(wrapper).toMatchSnapshot();
});
it("renders correctly when there is a titleField but it is not defined in result", () => {
    const wrapper = shallow(React.createElement(Result, Object.assign({}, Object.assign(Object.assign({}, requiredProps), { titleField: TITLE_FIELD }))));
    expect(wrapper).toMatchSnapshot();
});
it("renders correctly when there is a URL", () => {
    const wrapper = shallow(React.createElement(Result, Object.assign({}, Object.assign(Object.assign({}, requiredProps), { result: Object.assign(Object.assign({}, requiredProps.result), { [URL_FIELD]: { raw: URL_RESULT_VALUE } }), urlField: URL_FIELD }))));
    expect(wrapper).toMatchSnapshot();
});
it("renders correctly when there is a urlField but it is not defined in result", () => {
    const wrapper = shallow(React.createElement(Result, Object.assign({}, Object.assign(Object.assign({}, requiredProps), { urlField: URL_FIELD }))));
    expect(wrapper).toMatchSnapshot();
});
it("renders correctly when there is a title and url", () => {
    const wrapper = shallow(React.createElement(Result, Object.assign({}, Object.assign(Object.assign({}, requiredProps), { result: Object.assign(Object.assign({}, requiredProps.result), { [TITLE_FIELD]: { raw: TITLE_RESULT_VALUE }, [URL_FIELD]: { raw: URL_RESULT_VALUE } }), titleField: TITLE_FIELD, urlField: URL_FIELD }))));
    expect(wrapper).toMatchSnapshot();
});
it("filters out arbitrary fields from results, and does not render them", () => {
    const wrapper = shallow(React.createElement(Result, Object.assign({}, Object.assign(Object.assign({}, requiredProps), { result: Object.assign(Object.assign({}, requiredProps.result), ARBITRARY_FIELD) }))));
    expect(wrapper).toMatchSnapshot();
});
it("renders with className prop applied", () => {
    const customClassName = "test-class";
    const wrapper = shallow(React.createElement(Result, Object.assign({ className: customClassName }, requiredProps)));
    const { className } = wrapper.props();
    expect(className).toEqual("sui-result test-class");
});
it("renders correctly when there is a malicious URL", () => {
    const wrapper = shallow(React.createElement(Result, Object.assign({}, Object.assign(Object.assign({}, requiredProps), { result: Object.assign(Object.assign({}, requiredProps.result), { [URL_FIELD]: { raw: "javascript://test%0aalert(document.domain)" } }), urlField: URL_FIELD }))));
    expect(wrapper).toMatchSnapshot();
});
