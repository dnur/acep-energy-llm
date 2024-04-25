import type { RequestState, SortDirection } from "@elastic/search-ui";
export declare function adaptRequest(request: RequestState): {
    page: {
        current: number;
        size: number;
    };
    filters: {
        all?: undefined;
    } | {
        all: {
            [x: string]: any;
        }[];
    };
    sort: {
        [x: string]: SortDirection;
    }[] | {
        [x: string]: "asc" | "desc";
    };
    query: string;
};
