"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Set the current sort
 *
 * Will trigger new search
 *
 * @param sort SortList | string
 * @param sortDirection String ["asc"|"desc"]
 */
function setSort(sort, sortDirection) {
    // eslint-disable-next-line no-console
    if (this.debug)
        console.log("Search UI: Action", "setSort", ...arguments);
    const update = {
        current: 1,
        sortList: null,
        sortField: null,
        sortDirection: null
    };
    if (Array.isArray(sort)) {
        update.sortList = sort;
    }
    else {
        update.sortField = sort;
        update.sortDirection = sortDirection;
    }
    this._updateSearchResults(update);
}
exports.default = setSort;
