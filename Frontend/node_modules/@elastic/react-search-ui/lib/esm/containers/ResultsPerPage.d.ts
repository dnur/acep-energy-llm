import React, { Component } from "react";
import { ResultsPerPageContainerContext, ResultsPerPageContainerProps } from "@elastic/react-search-ui-views";
export declare class ResultsPerPageContainer extends Component<ResultsPerPageContainerProps> {
    static defaultProps: {
        options: number[];
    };
    render(): JSX.Element;
}
declare const _default: React.ComponentType<Omit<ResultsPerPageContainerProps, "resultsPerPage" | "setResultsPerPage"> & {
    mapContextToProps?: (context: import("../withSearch").SearchContextState) => ResultsPerPageContainerContext;
}>;
export default _default;
