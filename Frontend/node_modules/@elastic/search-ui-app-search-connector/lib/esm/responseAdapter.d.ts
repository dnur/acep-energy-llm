import type { Facet } from "@elastic/search-ui";
export declare function adaptResponse(response: any, options?: {}): {
    totalResults: any;
    totalPages: number;
    rawResponse: any;
    requestId: any;
    results: any;
    facets: Record<string, Facet[]>;
};
