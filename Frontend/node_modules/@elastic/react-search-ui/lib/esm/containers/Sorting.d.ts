import React, { Component } from "react";
import { SortingContainerContext, SortingContainerProps } from "@elastic/react-search-ui-views";
export declare class SortingContainer extends Component<SortingContainerProps> {
    render(): JSX.Element;
}
declare const _default: React.ComponentType<Omit<SortingContainerProps, "sortDirection" | "sortField" | "sortList" | "setSort"> & {
    mapContextToProps?: (context: import("../withSearch").SearchContextState) => SortingContainerContext;
}>;
export default _default;
