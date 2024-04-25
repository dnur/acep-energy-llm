import { FilterType, FilterValue } from "../types";
/**
 * Filter results - Adds to current filter value
 *
 * Will trigger new search
 *
 * @param name String field name to filter on
 * @param value String field value to filter on
 * @param type String (Optional) type of filter to apply
 */
export default function addFilter(name: string, value: FilterValue, type?: FilterType): void;
