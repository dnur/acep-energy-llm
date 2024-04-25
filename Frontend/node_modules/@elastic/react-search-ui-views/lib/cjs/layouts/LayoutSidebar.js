"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const view_helpers_1 = require("../view-helpers");
class LayoutSidebar extends react_1.default.Component {
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
            return (react_1.default.createElement("button", { hidden: true, type: "button", className: "sui-layout-sidebar-toggle", onClick: this.toggleSidebar }, label));
        };
        this.state = { isSidebarToggled: false };
    }
    render() {
        const { className, children } = this.props;
        const { isSidebarToggled } = this.state;
        const classes = (0, view_helpers_1.appendClassName)(className, isSidebarToggled ? `${className}--toggled` : null);
        return (react_1.default.createElement(react_1.default.Fragment, null,
            this.renderToggleButton("Show Filters"),
            react_1.default.createElement("div", { className: classes },
                this.renderToggleButton("Save Filters"),
                children)));
    }
}
exports.default = LayoutSidebar;
