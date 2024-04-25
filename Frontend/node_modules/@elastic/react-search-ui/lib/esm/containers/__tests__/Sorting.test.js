import React from "react";
import { shallow } from "enzyme";
import { SortingContainer } from "../Sorting";
const params = {
    results: [{}],
    searchTerm: "test",
    setSort: jest.fn(),
    sortDirection: "asc",
    sortField: "field",
    sortOptions: [
        {
            name: "name",
            value: "field",
            direction: "asc"
        },
        {
            name: "name",
            value: "field",
            direction: "desc"
        }
    ]
};
const sortListParams = Object.assign(Object.assign({}, params), { sortList: [
        {
            field: "states",
            direction: "asc"
        },
        {
            field: "title",
            direction: "desc"
        }
    ], sortOptions: [
        {
            name: "name",
            value: "field",
            direction: "asc"
        },
        {
            name: "name",
            value: "field",
            direction: "desc"
        },
        {
            name: "multiple",
            value: [
                {
                    field: "states",
                    direction: "asc"
                },
                {
                    field: "title",
                    direction: "desc"
                }
            ]
        }
    ] });
beforeEach(() => {
    params.setSort = jest.fn();
});
it("supports a render prop", () => {
    const render = ({ value }) => {
        return React.createElement("div", null, value);
    };
    const wrapper = shallow(React.createElement(SortingContainer, Object.assign({}, params, { view: render }))).dive();
    expect(wrapper).toMatchSnapshot();
});
it("renders when it doesn't have results or a search term", () => {
    const wrapper = shallow(React.createElement(SortingContainer, Object.assign({}, Object.assign(Object.assign({}, params), { searchTerm: "", results: [] })))).dive();
    expect(wrapper).toMatchSnapshot();
});
it("will call back when sort is changed in view", () => {
    let viewProps;
    shallow(React.createElement(SortingContainer, Object.assign({}, params, { view: (props) => {
            viewProps = props;
            return React.createElement("div", null);
        } }))).dive();
    const { onChange } = viewProps;
    onChange("field|||desc");
    const [sortField, sortDirection] = params.setSort.mock.calls[0];
    expect(sortField).toEqual("field");
    expect(sortDirection).toEqual("desc");
});
it("will call back when sort is changed in view with sortList", () => {
    let viewProps;
    shallow(React.createElement(SortingContainer, Object.assign({}, sortListParams, { view: (props) => {
            viewProps = props;
            return React.createElement("div", null);
        } }))).dive();
    const { onChange } = viewProps;
    onChange('[{"field":"states","direction":"asc"},{"field":"title","direction":"desc"}]');
    expect(sortListParams.setSort).toHaveBeenCalledWith([
        { direction: "asc", field: "states" },
        { direction: "desc", field: "title" }
    ], undefined);
});
it("passes className through to the view", () => {
    let viewProps;
    const className = "test-class";
    shallow(React.createElement(SortingContainer, Object.assign({}, params, { className: className, view: (props) => {
            viewProps = props;
            return React.createElement("div", null);
        } }))).dive();
    expect(viewProps.className).toEqual(className);
});
it("passes data-foo through to the view", () => {
    let viewProps;
    const data = "bar";
    shallow(React.createElement(SortingContainer, Object.assign({}, params, { "data-foo": data, view: (props) => {
            viewProps = props;
            return React.createElement("div", null);
        } }))).dive();
    expect(viewProps["data-foo"]).toEqual(data);
});
