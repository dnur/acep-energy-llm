import React, { Component } from "react";
import { PagingInfoContainerProps, PagingInfoContainerContext } from "@elastic/react-search-ui-views";
export declare class PagingInfoContainer extends Component<PagingInfoContainerProps> {
    render(): JSX.Element;
}
declare const _default: React.ComponentType<Omit<PagingInfoContainerProps, "resultSearchTerm" | "totalResults" | "pagingStart" | "pagingEnd"> & {
    mapContextToProps?: (context: import("../withSearch").SearchContextState) => PagingInfoContainerContext;
}>;
export default _default;
