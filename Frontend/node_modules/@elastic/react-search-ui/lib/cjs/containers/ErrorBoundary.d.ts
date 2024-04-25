import React, { Component } from "react";
import { ErrorBoundaryContainerContext, ErrorBoundaryViewProps } from "@elastic/react-search-ui-views";
import { BaseContainerProps } from "../types";
declare type ErrorBoundaryContainerProps = BaseContainerProps & ErrorBoundaryContainerContext & {
    view?: React.ComponentType<ErrorBoundaryViewProps>;
};
export declare class ErrorBoundaryContainer extends Component<ErrorBoundaryContainerProps> {
    render(): JSX.Element;
}
declare const _default: React.ComponentType<Omit<ErrorBoundaryContainerProps, "error"> & {
    mapContextToProps?: (context: import("../withSearch").SearchContextState) => ErrorBoundaryContainerContext;
}>;
export default _default;
