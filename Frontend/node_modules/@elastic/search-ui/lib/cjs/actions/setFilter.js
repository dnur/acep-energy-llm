"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
/**
 * Filter results - Replaces current filter value
 *
 * Will trigger new search
 *
 * @param name String field name to filter on
 * @param value FilterValue to apply
 * @param type String (Optional) type of filter to apply
 */
function setFilter(name, value, type = "all") {
    // eslint-disable-next-line no-console
    if (this.debug)
        console.log("Search UI: Action", "setFilter", ...arguments);
    let { filters } = this.state;
    filters = filters.filter((filter) => filter.field !== name || filter.type !== type);
    this._updateSearchResults({
        current: 1,
        filters: [
            ...filters,
            {
                field: name,
                values: [value],
                type
            }
        ]
    });
    const events = this.events;
    events.emit({
        type: "FacetFilterSelected",
        field: name,
        value: value && (0, helpers_1.serialiseFilter)([value]),
        query: this.state.searchTerm
    });
}
exports.default = setFilter;
