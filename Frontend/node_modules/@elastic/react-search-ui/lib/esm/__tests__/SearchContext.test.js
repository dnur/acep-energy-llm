import React from "react";
import { mount } from "enzyme";
import { SearchContext } from "..";
import { SearchDriver } from "@elastic/search-ui";
it("Should be a context", () => {
    const searchDriver = new SearchDriver({
        apiConnector: null
    });
    searchDriver.state.searchTerm = "a search term";
    const value = mount(React.createElement(SearchContext.Provider, { value: { driver: searchDriver } },
        React.createElement(SearchContext.Consumer, null, ({ driver }) => React.createElement("div", null, driver.state.searchTerm))));
    expect(value.text()).toBe("a search term");
});
