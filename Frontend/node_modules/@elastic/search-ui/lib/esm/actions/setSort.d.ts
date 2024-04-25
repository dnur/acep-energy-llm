import { SortOption, SortDirection } from "../types";
/**
 * Set the current sort
 *
 * Will trigger new search
 *
 * @param sort SortList | string
 * @param sortDirection String ["asc"|"desc"]
 */
export default function setSort(sort: SortOption[] | string, sortDirection: SortDirection): void;
