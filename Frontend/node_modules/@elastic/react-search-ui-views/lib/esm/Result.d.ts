import React from "react";
import type { SearchContextState, SearchResult } from "@elastic/search-ui";
import { BaseContainerProps } from "./types";
export declare type ResultContainerContext = Pick<SearchContextState, "trackClickThrough">;
export declare type ResultContainerProps = BaseContainerProps & ResultContainerContext & {
    view?: React.ComponentType<ResultViewProps>;
    clickThroughTags?: string[];
    titleField?: string;
    urlField?: string;
    thumbnailField?: string;
    result: SearchResult;
    shouldTrackClickThrough?: boolean;
};
export declare type ResultViewProps = BaseContainerProps & Pick<ResultContainerProps, "result" | "titleField" | "urlField" | "thumbnailField"> & {
    key?: string;
    onClickLink: () => void;
};
declare function Result({ className, result, onClickLink, titleField, urlField, thumbnailField, ...rest }: ResultViewProps): JSX.Element;
export default Result;
