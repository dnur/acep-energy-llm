import React from "react";
interface LayoutProps {
    className?: string;
    children?: React.ReactNode;
    header?: React.ReactNode;
    bodyContent?: React.ReactNode;
    bodyFooter?: React.ReactNode;
    bodyHeader?: React.ReactNode;
    sideContent?: React.ReactNode;
}
declare function Layout({ className, children, header, bodyContent, bodyFooter, bodyHeader, sideContent }: LayoutProps): JSX.Element;
export default Layout;
