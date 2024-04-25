import React from "react";
function SearchInput({ getAutocomplete, getButtonProps, getInputProps }) {
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "sui-search-box__wrapper" },
            React.createElement("input", Object.assign({}, getInputProps())),
            getAutocomplete()),
        React.createElement("input", Object.assign({}, getButtonProps()))));
}
export default SearchInput;
