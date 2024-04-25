import React from "react";
import { Component } from "react";
import { FacetContainerContext, FacetContainerProps } from "@elastic/react-search-ui-views";
declare type FacetContainerState = {
    searchTerm: string;
    more: number;
};
export declare class FacetContainer extends Component<FacetContainerProps, FacetContainerState> {
    static defaultProps: {
        filterType: string;
        isFilterable: boolean;
        show: number;
    };
    constructor(props: any);
    handleClickMore: (totalOptions: any) => void;
    handleFacetSearch: (searchTerm: any) => void;
    render(): JSX.Element;
}
declare const _default: React.ComponentType<Omit<FacetContainerProps, "filters" | "facets" | "addFilter" | "removeFilter" | "setFilter" | "a11yNotify"> & {
    mapContextToProps?: (context: import("../withSearch").SearchContextState) => FacetContainerContext;
}>;
export default _default;
