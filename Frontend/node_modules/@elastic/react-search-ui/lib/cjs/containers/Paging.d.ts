import React from "react";
import { PagingContainerContext, PagingContainerProps } from "@elastic/react-search-ui-views";
export declare function PagingContainer({ className, current, resultsPerPage, setCurrent, totalPages, view, ...rest }: PagingContainerProps): JSX.Element;
declare const _default: React.ComponentType<Omit<PagingContainerProps, "current" | "resultsPerPage" | "totalPages" | "setCurrent"> & {
    mapContextToProps?: (context: import("../withSearch").SearchContextState) => PagingContainerContext;
}>;
export default _default;
