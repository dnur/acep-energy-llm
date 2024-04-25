import React from "react";
import type { SearchContextState } from "@elastic/search-ui";
import { Rename, BaseContainerProps } from "./types";
export declare type PagingContainerContext = Pick<SearchContextState, "current" | "resultsPerPage" | "totalPages" | "setCurrent">;
export declare type PagingViewProps = Rename<BaseContainerProps & PagingContainerContext, {
    setCurrent: "onChange";
}>;
export declare type PagingContainerProps = BaseContainerProps & PagingContainerContext & {
    view?: React.ComponentType<PagingViewProps>;
};
declare function Paging({ className, current, resultsPerPage, onChange, totalPages, ...rest }: PagingViewProps): JSX.Element;
export default Paging;
