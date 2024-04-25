import React from "react";
import type { SearchContextState } from "@elastic/search-ui";
import { BaseContainerProps } from "./types";
export declare type ErrorBoundaryContainerContext = Pick<SearchContextState, "error">;
export declare type ErrorBoundaryViewProps = BaseContainerProps & ErrorBoundaryContainerContext;
declare function ErrorBoundary({ children, className, error, ...rest }: ErrorBoundaryViewProps & React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export default ErrorBoundary;
