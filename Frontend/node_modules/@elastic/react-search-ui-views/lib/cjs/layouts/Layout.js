"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const LayoutSidebar_1 = __importDefault(require("./LayoutSidebar"));
const view_helpers_1 = require("../view-helpers");
function Layout({ className, children, header, bodyContent, bodyFooter, bodyHeader, sideContent }) {
    return (react_1.default.createElement("div", { className: (0, view_helpers_1.appendClassName)("sui-layout", className) },
        react_1.default.createElement("div", { className: "sui-layout-header" },
            react_1.default.createElement("div", { className: "sui-layout-header__inner" }, header)),
        react_1.default.createElement("div", { className: "sui-layout-body" },
            react_1.default.createElement("div", { className: "sui-layout-body__inner" },
                react_1.default.createElement(LayoutSidebar_1.default, { className: "sui-layout-sidebar" }, sideContent),
                react_1.default.createElement("div", { className: "sui-layout-main" },
                    react_1.default.createElement("div", { className: "sui-layout-main-header" },
                        react_1.default.createElement("div", { className: "sui-layout-main-header__inner" }, bodyHeader)),
                    react_1.default.createElement("div", { className: "sui-layout-main-body" }, children || bodyContent),
                    react_1.default.createElement("div", { className: "sui-layout-main-footer" }, bodyFooter))))));
}
exports.default = Layout;
