import { Filter, FilterType, FilterValue, FilterValueRange } from "./types";
/**
 * Given a list of applied Filters, find FilterValues based on
 * "fieldName" and "filterType".
 *
 * @param {*} filters
 * @param {*} name
 * @param {*} filterType
 */
export declare function findFilterValues(filters: Filter[], name: string, filterType: FilterType): FilterValue[];
/**
 * Given a list of applied Filters, remove a single FilterValue based on
 * "fieldName" and "filterType".
 *
 * @param {Filter[]} filters
 * @param {String} fieldName
 * @param {FilterValue} value
 * @param {FilterType} filterType
 */
export declare function removeSingleFilterValue(filters: Filter[], fieldName: string, value: FilterValue, filterType: FilterType): Filter[];
/**
 * Given a Facet and a list of applied Filters, mark the Facet Values
 * for that Facet as "selected" based on "fieldName" and "filterType".
 *
 * @param {Facet} facet
 * @param {String} fieldName
 * @param {Filter[]} filters
 * @param {FilterType} filterType
 */
export declare function markSelectedFacetValuesFromFilters(facet: any, filters: Filter[], fieldName: any, filterType: any): any;
/**
 * Useful for determining when filter values match. This could be used
 * when matching applied filters back to facet options, or for determining
 * whether or not a filter already exists in a list of applied filters.
 *
 * @param {FilterValue} filterValue1
 * @param {FilterValue} filterValue2
 */
export declare function doFilterValuesMatch(filterValue1: any, filterValue2: any): any;
export declare function mergeFilters(filters1: any, filters2: any): any;
export declare function isFilterValueRange(filterValue: FilterValue): filterValue is FilterValueRange;
export declare const serialiseFilter: (filterValues: FilterValue[]) => string;
