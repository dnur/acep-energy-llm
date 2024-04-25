import type { SearchContextState } from "@elastic/search-ui";
import React from "react";
import { Rename, BaseContainerProps } from "./types";
export declare type PagingInfoContainerContext = Pick<SearchContextState, "pagingStart" | "pagingEnd" | "resultSearchTerm" | "totalResults">;
export declare type PagingInfoViewProps = Rename<BaseContainerProps & PagingInfoContainerContext, {
    pagingStart: "start";
    resultSearchTerm: "searchTerm";
    pagingEnd: "end";
}>;
export declare type PagingInfoContainerProps = BaseContainerProps & PagingInfoContainerContext & {
    view?: React.ComponentType<PagingInfoViewProps>;
};
declare function PagingInfo({ className, end, searchTerm, start, totalResults, ...rest }: PagingInfoViewProps & React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export default PagingInfo;
