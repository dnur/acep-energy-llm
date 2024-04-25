export { default as SearchDriver, DEFAULT_STATE } from "./SearchDriver";
export type { SearchDriverOptions } from "./SearchDriver";
export declare const helpers: {
    findFilterValues(filters: import("./types").Filter[], name: string, filterType: import("./types").FilterType): import("./types").FilterValue[];
    removeSingleFilterValue(filters: import("./types").Filter[], fieldName: string, value: import("./types").FilterValue, filterType: import("./types").FilterType): import("./types").Filter[];
    markSelectedFacetValuesFromFilters(facet: any, filters: import("./types").Filter[], fieldName: any, filterType: any): any;
    doFilterValuesMatch(filterValue1: any, filterValue2: any): any;
    mergeFilters(filters1: any, filters2: any): any;
    isFilterValueRange(filterValue: import("./types").FilterValue): filterValue is import("./types").FilterValueRange;
    serialiseFilter: (filterValues: import("./types").FilterValue[]) => string;
};
export * from "./constants";
export * from "./types";
export type { SearchDriverActions } from "./actions";
