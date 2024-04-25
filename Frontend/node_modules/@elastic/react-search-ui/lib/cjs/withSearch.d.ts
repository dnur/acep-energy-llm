import React from "react";
import type { SearchState, SearchDriverActions } from "@elastic/search-ui";
export declare type SearchContextState = SearchState & SearchDriverActions;
/**
 * This is a Higher Order Component that wraps a component and injects state and actions from Search UI, effectively
 * "connecting" it to Search UI.
 *
 * Components using `withSearch` will be "Pure" components.
 * It is important to understand the implications of using a PureComponent, as described here:
 * https://reactjs.org/docs/optimizing-performance.html#examples
 *
 * @param Function mapContextToProps A function that accepts the context and allows you to pick the values to be passed as props
 * into the component. This allows you to "select" which values from the context to use.
 * @param Function Component
 */
declare type withSearchProps<T> = {
    mapContextToProps?: (context: SearchContextState) => T;
};
declare function withSearch<TProps, TContext>(mapContextToProps: (context: SearchContextState) => TContext): (Component: React.ComponentType<any>) => React.ComponentType<Omit<TProps, keyof TContext> & withSearchProps<TContext>>;
export default withSearch;
