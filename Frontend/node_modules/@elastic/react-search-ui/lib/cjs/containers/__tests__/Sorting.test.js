"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const Sorting_1 = require("../Sorting");
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
        return react_1.default.createElement("div", null, value);
    };
    const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(Sorting_1.SortingContainer, Object.assign({}, params, { view: render }))).dive();
    expect(wrapper).toMatchSnapshot();
});
it("renders when it doesn't have results or a search term", () => {
    const wrapper = (0, enzyme_1.shallow)(react_1.default.createElement(Sorting_1.SortingContainer, Object.assign({}, Object.assign(Object.assign({}, params), { searchTerm: "", results: [] })))).dive();
    expect(wrapper).toMatchSnapshot();
});
it("will call back when sort is changed in view", () => {
    let viewProps;
    (0, enzyme_1.shallow)(react_1.default.createElement(Sorting_1.SortingContainer, Object.assign({}, params, { view: (props) => {
            viewProps = props;
            return react_1.default.createElement("div", null);
        } }))).dive();
    const { onChange } = viewProps;
    onChange("field|||desc");
    const [sortField, sortDirection] = params.setSort.mock.calls[0];
    expect(sortField).toEqual("field");
    expect(sortDirection).toEqual("desc");
});
it("will call back when sort is changed in view with sortList", () => {
    let viewProps;
    (0, enzyme_1.shallow)(react_1.default.createElement(Sorting_1.SortingContainer, Object.assign({}, sortListParams, { view: (props) => {
            viewProps = props;
            return react_1.default.createElement("div", null);
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
    (0, enzyme_1.shallow)(react_1.default.createElement(Sorting_1.SortingContainer, Object.assign({}, params, { className: className, view: (props) => {
            viewProps = props;
            return react_1.default.createElement("div", null);
        } }))).dive();
    expect(viewProps.className).toEqual(className);
});
it("passes data-foo through to the view", () => {
    let viewProps;
    const data = "bar";
    (0, enzyme_1.shallow)(react_1.default.createElement(Sorting_1.SortingContainer, Object.assign({}, params, { "data-foo": data, view: (props) => {
            viewProps = props;
            return react_1.default.createElement("div", null);
        } }))).dive();
    expect(viewProps["data-foo"]).toEqual(data);
});
