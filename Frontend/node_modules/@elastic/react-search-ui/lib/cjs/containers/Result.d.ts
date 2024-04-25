import React from "react";
import { Component } from "react";
import { ResultContainerProps, ResultContainerContext } from "@elastic/react-search-ui-views";
export declare class ResultContainer extends Component<ResultContainerProps> {
    static defaultProps: {
        clickThroughTags: any[];
        shouldTrackClickThrough: boolean;
    };
    handleClickLink: (id: any) => void;
    render(): JSX.Element;
}
declare const _default: React.ComponentType<Omit<ResultContainerProps, "trackClickThrough"> & {
    mapContextToProps?: (context: import("../withSearch").SearchContextState) => ResultContainerContext;
}>;
export default _default;
