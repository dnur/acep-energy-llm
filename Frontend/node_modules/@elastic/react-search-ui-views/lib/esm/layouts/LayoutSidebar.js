import React from "react";
import { appendClassName } from "../view-helpers";
class LayoutSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.toggleSidebar = () => {
            this.setState(({ isSidebarToggled }) => ({
                isSidebarToggled: !isSidebarToggled
            }));
        };
        this.renderToggleButton = (label) => {
            if (!this.props.children)
                return null;
            return (React.createElement("button", { hidden: true, type: "button", className: "sui-layout-sidebar-toggle", onClick: this.toggleSidebar }, label));
        };
        this.state = { isSidebarToggled: false };
    }
    render() {
        const { className, children } = this.props;
        const { isSidebarToggled } = this.state;
        const classes = appendClassName(className, isSidebarToggled ? `${className}--toggled` : null);
        return (React.createElement(React.Fragment, null,
            this.renderToggleButton("Show Filters"),
            React.createElement("div", { className: classes },
                this.renderToggleButton("Save Filters"),
                children)));
    }
}
export default LayoutSidebar;
