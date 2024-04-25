import React from "react";
interface LayoutSidebarProps {
    className: string;
    children: React.ReactNode;
}
interface LayoutSidebarState {
    isSidebarToggled: boolean;
}
declare class LayoutSidebar extends React.Component<LayoutSidebarProps, LayoutSidebarState> {
    constructor(props: any);
    toggleSidebar: () => void;
    renderToggleButton: (label: any) => JSX.Element;
    render(): JSX.Element;
}
export default LayoutSidebar;
