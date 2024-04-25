import { FilterType, FilterValue } from "../types";
/**
 * Remove filter from results
 *
 * Will trigger new search
 *
 * @param name String field name for filter to remove
 * @param value String (Optional) field value for filter to remove
 * @param type String (Optional) type of filter to remove
 */
export default function removeFilter(name: string, value?: FilterValue, type?: FilterType): void;
