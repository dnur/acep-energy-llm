"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adaptResponse = void 0;
function adaptation1AdaptFacetValue(facetValue, additionalFacetValueFieldsForField = {}) {
    const hasValue = Object.prototype.hasOwnProperty.call(facetValue, "value");
    const { count, value } = facetValue, rest = __rest(facetValue, ["count", "value"]);
    return {
        count,
        // TODO: Looks like a bug.
        // "value" type is
        // FilterValue | { selected: boolean; }
        // Doesn't look like { selected: boolean; } is the correct return type
        // Also, when testing locally, the "selected" property never appears
        value: hasValue
            ? value
            : Object.assign(Object.assign({}, rest), additionalFacetValueFieldsForField)
    };
}
// Should be facet: Facet, but this results in a type error, see description above
function adaptation2AddLabelToFacet(fieldName, facet) {
    return Object.assign({ field: fieldName }, facet);
}
function adaptFacets(facets, { additionalFacetValueFields = {} }) {
    if (!facets || Object.keys(facets).length === 0)
        return facets;
    return Object.entries(facets).reduce((acc, [fieldName, facet]) => {
        const adaptedFacet = facet.map((v) => {
            const { type, data } = v, rest = __rest(v, ["type", "data"]);
            return adaptation2AddLabelToFacet(fieldName, Object.assign({ type, data: data.map((f) => adaptation1AdaptFacetValue(f, additionalFacetValueFields[fieldName])) }, rest));
        });
        return Object.assign(Object.assign({}, acc), { [fieldName]: adaptedFacet });
    }, {});
}
function limitTo100pages(totalPages) {
    // We limit this to 100 pages since App Search currently cannot page past 100 pages
    return Math.min(totalPages, 100);
}
function adaptResponse(response, options = {}) {
    const facets = response.info.facets;
    const requestId = response.info.meta.request_id;
    const totalPages = response.info.meta.page &&
        typeof response.info.meta.page.total_pages !== "undefined"
        ? limitTo100pages(response.info.meta.page.total_pages)
        : undefined;
    const totalResults = response.info.meta.page
        ? response.info.meta.page.total_results
        : undefined;
    return Object.assign(Object.assign(Object.assign(Object.assign({}, (facets && { facets: adaptFacets(facets, options) })), { rawResponse: response, requestId, results: response.rawResults }), (totalPages !== undefined && { totalPages })), (totalResults !== undefined && { totalResults }));
}
exports.adaptResponse = adaptResponse;
