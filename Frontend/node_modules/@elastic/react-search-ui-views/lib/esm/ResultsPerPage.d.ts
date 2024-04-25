import type { SearchContextState } from "@elastic/search-ui";
import React from "react";
import { BaseContainerProps, Rename } from "./types";
export declare type ResultsPerPageContainerContext = Pick<SearchContextState, "resultsPerPage" | "setResultsPerPage">;
export declare type ResultsPerPageContainerProps = BaseContainerProps & ResultsPerPageContainerContext & {
    view?: React.ComponentType<ResultsPerPageViewProps>;
    options?: number[];
};
export declare type ResultsPerPageViewProps = BaseContainerProps & Pick<ResultsPerPageContainerProps, "options"> & Rename<ResultsPerPageContainerContext, {
    setResultsPerPage: "onChange";
    resultsPerPage: "value";
}>;
declare function ResultsPerPage({ className, onChange, options, value: selectedValue, ...rest }: ResultsPerPageViewProps): JSX.Element;
export default ResultsPerPage;
