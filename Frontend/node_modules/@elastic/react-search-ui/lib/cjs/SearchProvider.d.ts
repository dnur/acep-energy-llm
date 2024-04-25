import React from "react";
import { SearchDriver } from "@elastic/search-ui";
import type { SearchDriverOptions } from "@elastic/search-ui";
export interface SearchProviderContextInterface {
    driver: SearchDriver;
}
declare type SearchProviderProps = {
    children: React.ReactNode;
    config: SearchDriverOptions;
    driver?: SearchDriver;
};
/**
 * The SearchProvider primarily holds a reference to the SearchDriver and
 * exposes it to the rest of the application in a Context.
 */
declare const SearchProvider: ({ children, config, driver }: SearchProviderProps) => JSX.Element;
export default SearchProvider;
