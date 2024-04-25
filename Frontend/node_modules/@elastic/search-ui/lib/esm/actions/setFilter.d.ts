import { FilterType, FilterValue } from "../types";
/**
 * Filter results - Replaces current filter value
 *
 * Will trigger new search
 *
 * @param name String field name to filter on
 * @param value FilterValue to apply
 * @param type String (Optional) type of filter to apply
 */
export default function setFilter(name: string, value: FilterValue, type?: FilterType): void;
