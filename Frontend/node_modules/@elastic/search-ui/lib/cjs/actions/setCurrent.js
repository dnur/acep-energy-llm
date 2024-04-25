"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Set the current page
 *
 * Will trigger new search
 *
 * @param current Integer
 */
function setCurrent(current) {
    // eslint-disable-next-line no-console
    if (this.debug)
        console.log("Search UI: Action", "setCurrent", ...arguments);
    this._updateSearchResults({
        current
    });
}
exports.default = setCurrent;
