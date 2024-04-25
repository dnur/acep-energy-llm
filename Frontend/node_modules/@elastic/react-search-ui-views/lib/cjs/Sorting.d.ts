import type { SearchContextState } from "@elastic/search-ui";
import React from "react";
import { BaseContainerProps } from "./types";
export declare type SortingContainerContext = Pick<SearchContextState, "sortDirection" | "sortField" | "sortList" | "setSort">;
export declare type SortingViewProps = BaseContainerProps & Pick<SortingContainerProps, "label"> & {
    onChange: (sortData?: any) => void;
    options: {
        value: string;
        label: string;
    }[];
    value: string;
};
export declare type SortingContainerProps = BaseContainerProps & SortingContainerContext & {
    view?: React.ComponentType<SortingViewProps>;
    label?: string;
    sortOptions: any;
};
declare function Sorting({ className, label, onChange, options, value, ...rest }: SortingViewProps): JSX.Element;
export default Sorting;
