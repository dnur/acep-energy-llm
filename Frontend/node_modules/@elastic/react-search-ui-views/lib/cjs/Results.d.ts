import type { SearchContextState, SearchResult } from "@elastic/search-ui";
import React from "react";
import { BaseContainerProps } from "./types";
import { ResultViewProps } from "./Result";
export declare type ResultsContainerContext = Pick<SearchContextState, "results">;
export declare type ResultsContainerProps = BaseContainerProps & ResultsContainerContext & {
    view?: React.ComponentType<ResultsViewProps>;
    resultView?: React.ComponentType<ResultViewProps>;
    clickThroughTags?: string[];
    titleField?: string;
    urlField?: string;
    thumbnailField?: string;
    results: SearchResult[];
    shouldTrackClickThrough?: boolean;
};
export declare type ResultsViewProps = BaseContainerProps;
declare function Results({ children, className, ...rest }: ResultsViewProps & React.HTMLAttributes<HTMLUListElement>): JSX.Element;
export default Results;
