"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const withSearch_1 = __importDefault(require("./withSearch"));
const prop_types_1 = __importDefault(require("prop-types"));
function WithSearch({ mapContextToProps, children }) {
    const Search = (0, withSearch_1.default)(mapContextToProps)((props) => {
        return children(props);
    });
    return react_1.default.createElement(Search, null);
}
WithSearch.propTypes = {
    mapContextToProps: prop_types_1.default.func,
    children: prop_types_1.default.func.isRequired
};
exports.default = WithSearch;
