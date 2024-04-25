import React from "react";
import LayoutSidebar from "./LayoutSidebar";
import { appendClassName } from "../view-helpers";
function Layout({ className, children, header, bodyContent, bodyFooter, bodyHeader, sideContent }) {
    return (React.createElement("div", { className: appendClassName("sui-layout", className) },
        React.createElement("div", { className: "sui-layout-header" },
            React.createElement("div", { className: "sui-layout-header__inner" }, header)),
        React.createElement("div", { className: "sui-layout-body" },
            React.createElement("div", { className: "sui-layout-body__inner" },
                React.createElement(LayoutSidebar, { className: "sui-layout-sidebar" }, sideContent),
                React.createElement("div", { className: "sui-layout-main" },
                    React.createElement("div", { className: "sui-layout-main-header" },
                        React.createElement("div", { className: "sui-layout-main-header__inner" }, bodyHeader)),
                    React.createElement("div", { className: "sui-layout-main-body" }, children || bodyContent),
                    React.createElement("div", { className: "sui-layout-main-footer" }, bodyFooter))))));
}
export default Layout;
