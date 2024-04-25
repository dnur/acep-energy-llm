/// <reference types="react" />
import type { Facet, Filter } from "@elastic/search-ui";
export declare type BaseContainerProps = {
    children?: React.ReactNode;
    className?: string;
};
export declare type BaseContainerStateProps = {
    error: string;
    filters: Filter[];
    facets: Record<string, Facet>;
};
export declare type Rename<T, R extends {
    [K in keyof R]: K extends keyof T ? PropertyKey : "Error: key not in T";
}> = {
    [P in keyof T as P extends keyof R ? R[P] : P]: T[P];
};
