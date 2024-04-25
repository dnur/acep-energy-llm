export default function buildResponseAdapterOptions(config = {}) {
    const additionalFacetValueFields = Object.entries(config.facets || {}).reduce((acc, [fieldName, facetConfig]) => {
        if (facetConfig.unit && facetConfig.center) {
            return Object.assign(Object.assign({}, (acc || {})), { [fieldName]: Object.assign(Object.assign({}, (facetConfig.unit && { unit: facetConfig.unit })), (facetConfig.center && { center: facetConfig.center })) });
        }
        return acc;
    }, null);
    return Object.assign({}, (additionalFacetValueFields && { additionalFacetValueFields }));
}
