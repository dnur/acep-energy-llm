import type { QueryConfig } from "@elastic/search-ui";
export default function buildResponseAdapterOptions(config?: QueryConfig): {
    additionalFacetValueFields: {
        0?: string;
        1?: import("@elastic/search-ui").FacetConfiguration;
        length?: 2;
        toString?: () => string;
        toLocaleString?: () => string;
        pop?: () => string | import("@elastic/search-ui").FacetConfiguration;
        push?: (...items: (string | import("@elastic/search-ui").FacetConfiguration)[]) => number;
        concat?: {
            (...items: ConcatArray<string | import("@elastic/search-ui").FacetConfiguration>[]): (string | import("@elastic/search-ui").FacetConfiguration)[];
            (...items: (string | import("@elastic/search-ui").FacetConfiguration | ConcatArray<string | import("@elastic/search-ui").FacetConfiguration>)[]): (string | import("@elastic/search-ui").FacetConfiguration)[];
        };
        join?: (separator?: string) => string;
        reverse?: () => (string | import("@elastic/search-ui").FacetConfiguration)[];
        shift?: () => string | import("@elastic/search-ui").FacetConfiguration;
        slice?: (start?: number, end?: number) => (string | import("@elastic/search-ui").FacetConfiguration)[];
        sort?: (compareFn?: (a: string | import("@elastic/search-ui").FacetConfiguration, b: string | import("@elastic/search-ui").FacetConfiguration) => number) => [string, import("@elastic/search-ui").FacetConfiguration];
        splice?: {
            (start: number, deleteCount?: number): (string | import("@elastic/search-ui").FacetConfiguration)[];
            (start: number, deleteCount: number, ...items: (string | import("@elastic/search-ui").FacetConfiguration)[]): (string | import("@elastic/search-ui").FacetConfiguration)[];
        };
        unshift?: (...items: (string | import("@elastic/search-ui").FacetConfiguration)[]) => number;
        indexOf?: (searchElement: string | import("@elastic/search-ui").FacetConfiguration, fromIndex?: number) => number;
        lastIndexOf?: (searchElement: string | import("@elastic/search-ui").FacetConfiguration, fromIndex?: number) => number;
        every?: {
            <S extends string | import("@elastic/search-ui").FacetConfiguration>(predicate: (value: string | import("@elastic/search-ui").FacetConfiguration, index: number, array: (string | import("@elastic/search-ui").FacetConfiguration)[]) => value is S, thisArg?: any): this is S[];
            (predicate: (value: string | import("@elastic/search-ui").FacetConfiguration, index: number, array: (string | import("@elastic/search-ui").FacetConfiguration)[]) => unknown, thisArg?: any): boolean;
        };
        some?: (predicate: (value: string | import("@elastic/search-ui").FacetConfiguration, index: number, array: (string | import("@elastic/search-ui").FacetConfiguration)[]) => unknown, thisArg?: any) => boolean;
        forEach?: (callbackfn: (value: string | import("@elastic/search-ui").FacetConfiguration, index: number, array: (string | import("@elastic/search-ui").FacetConfiguration)[]) => void, thisArg?: any) => void;
        map?: <U>(callbackfn: (value: string | import("@elastic/search-ui").FacetConfiguration, index: number, array: (string | import("@elastic/search-ui").FacetConfiguration)[]) => U, thisArg?: any) => U[];
        filter?: {
            <S_1 extends string | import("@elastic/search-ui").FacetConfiguration>(predicate: (value: string | import("@elastic/search-ui").FacetConfiguration, index: number, array: (string | import("@elastic/search-ui").FacetConfiguration)[]) => value is S_1, thisArg?: any): S_1[];
            (predicate: (value: string | import("@elastic/search-ui").FacetConfiguration, index: number, array: (string | import("@elastic/search-ui").FacetConfiguration)[]) => unknown, thisArg?: any): (string | import("@elastic/search-ui").FacetConfiguration)[];
        };
        reduce?: {
            (callbackfn: (previousValue: string | import("@elastic/search-ui").FacetConfiguration, currentValue: string | import("@elastic/search-ui").FacetConfiguration, currentIndex: number, array: (string | import("@elastic/search-ui").FacetConfiguration)[]) => string | import("@elastic/search-ui").FacetConfiguration): string | import("@elastic/search-ui").FacetConfiguration;
            (callbackfn: (previousValue: string | import("@elastic/search-ui").FacetConfiguration, currentValue: string | import("@elastic/search-ui").FacetConfiguration, currentIndex: number, array: (string | import("@elastic/search-ui").FacetConfiguration)[]) => string | import("@elastic/search-ui").FacetConfiguration, initialValue: string | import("@elastic/search-ui").FacetConfiguration): string | import("@elastic/search-ui").FacetConfiguration;
            <U_1>(callbackfn: (previousValue: U_1, currentValue: string | import("@elastic/search-ui").FacetConfiguration, currentIndex: number, array: (string | import("@elastic/search-ui").FacetConfiguration)[]) => U_1, initialValue: U_1): U_1;
        };
        reduceRight?: {
            (callbackfn: (previousValue: string | import("@elastic/search-ui").FacetConfiguration, currentValue: string | import("@elastic/search-ui").FacetConfiguration, currentIndex: number, array: (string | import("@elastic/search-ui").FacetConfiguration)[]) => string | import("@elastic/search-ui").FacetConfiguration): string | import("@elastic/search-ui").FacetConfiguration;
            (callbackfn: (previousValue: string | import("@elastic/search-ui").FacetConfiguration, currentValue: string | import("@elastic/search-ui").FacetConfiguration, currentIndex: number, array: (string | import("@elastic/search-ui").FacetConfiguration)[]) => string | import("@elastic/search-ui").FacetConfiguration, initialValue: string | import("@elastic/search-ui").FacetConfiguration): string | import("@elastic/search-ui").FacetConfiguration;
            <U_2>(callbackfn: (previousValue: U_2, currentValue: string | import("@elastic/search-ui").FacetConfiguration, currentIndex: number, array: (string | import("@elastic/search-ui").FacetConfiguration)[]) => U_2, initialValue: U_2): U_2;
        };
        find?: {
            <S_2 extends string | import("@elastic/search-ui").FacetConfiguration>(predicate: (this: void, value: string | import("@elastic/search-ui").FacetConfiguration, index: number, obj: (string | import("@elastic/search-ui").FacetConfiguration)[]) => value is S_2, thisArg?: any): S_2;
            (predicate: (value: string | import("@elastic/search-ui").FacetConfiguration, index: number, obj: (string | import("@elastic/search-ui").FacetConfiguration)[]) => unknown, thisArg?: any): string | import("@elastic/search-ui").FacetConfiguration;
        };
        findIndex?: (predicate: (value: string | import("@elastic/search-ui").FacetConfiguration, index: number, obj: (string | import("@elastic/search-ui").FacetConfiguration)[]) => unknown, thisArg?: any) => number;
        fill?: (value: string | import("@elastic/search-ui").FacetConfiguration, start?: number, end?: number) => [string, import("@elastic/search-ui").FacetConfiguration];
        copyWithin?: (target: number, start: number, end?: number) => [string, import("@elastic/search-ui").FacetConfiguration];
        entries?: () => IterableIterator<[number, string | import("@elastic/search-ui").FacetConfiguration]>;
        keys?: () => IterableIterator<number>;
        values?: () => IterableIterator<string | import("@elastic/search-ui").FacetConfiguration>;
        includes?: (searchElement: string | import("@elastic/search-ui").FacetConfiguration, fromIndex?: number) => boolean;
        flatMap?: <U_3, This = undefined>(callback: (this: This, value: string | import("@elastic/search-ui").FacetConfiguration, index: number, array: (string | import("@elastic/search-ui").FacetConfiguration)[]) => U_3 | readonly U_3[], thisArg?: This) => U_3[];
        flat?: <A, D extends number = 1>(this: A, depth?: D) => FlatArray<A, D>[];
        [Symbol.iterator]?: () => IterableIterator<string | import("@elastic/search-ui").FacetConfiguration>;
        [Symbol.unscopables]?: () => {
            copyWithin: boolean;
            entries: boolean;
            fill: boolean;
            find: boolean;
            findIndex: boolean;
            keys: boolean;
            values: boolean;
        };
        at?: (index: number) => string | import("@elastic/search-ui").FacetConfiguration;
    };
};
