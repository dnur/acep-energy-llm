import React from "react";
declare type FacetsProps = {
    children: React.ReactNode;
    className?: string;
} & React.HTMLAttributes<HTMLDivElement>;
declare function Facets({ children, className, ...rest }: FacetsProps): JSX.Element;
export default Facets;
