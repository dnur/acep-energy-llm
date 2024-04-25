import React, { Component } from "react";
import { ResultsContainerProps, ResultsContainerContext } from "@elastic/react-search-ui-views";
export declare class ResultsContainer extends Component<ResultsContainerProps> {
    static defaultProps: {
        clickThroughTags: any[];
        shouldTrackClickThrough: boolean;
    };
    render(): JSX.Element;
}
declare const _default: React.ComponentType<Omit<ResultsContainerProps, "results"> & {
    mapContextToProps?: (context: import("../withSearch").SearchContextState) => ResultsContainerContext;
}>;
export default _default;
