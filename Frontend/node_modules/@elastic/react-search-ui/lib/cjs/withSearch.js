"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const SearchContext_1 = __importDefault(require("./SearchContext"));
function buildContextForProps(context) {
    return Object.assign(Object.assign({}, context.driver.getState()), context.driver.getActions());
}
/* For a given object execute mapContextToProps to pluck out the relevant
properties */
function giveMeJustWhatINeeded(stateOrContext, mapContextToProps, props) {
    const mapContextToPropsToUse = props.mapContextToProps || mapContextToProps;
    return mapContextToPropsToUse(stateOrContext, props) || {};
}
function withSearch(mapContextToProps) {
    if (!mapContextToProps) {
        throw "withSearch requires a function to be provided which returns an object with at least one value.";
    }
    return function (Component) {
        class WithSearch extends react_1.default.PureComponent {
            constructor(props, context) {
                super(props);
                this.subscription = (state) => {
                    if (!this.mounted)
                        return;
                    this.setState((prevState) => giveMeJustWhatINeeded(Object.assign(Object.assign({}, prevState), state), mapContextToProps, this.props));
                };
                this.mounted = false;
                this.state = Object.assign({}, giveMeJustWhatINeeded(buildContextForProps(context), mapContextToProps, props));
            }
            componentDidMount() {
                this.mounted = true;
                // Note that we subscribe to changes at the component level, rather than
                // at the top level Provider, so that we are re-rendering the entire
                // subtree when state changes in the Provider.
                this.context.driver.subscribeToStateChanges(this.subscription);
            }
            componentWillUnmount() {
                this.mounted = false;
                this.context.driver.unsubscribeToStateChanges(this.subscription);
            }
            render() {
                const rest = __rest(this.props, []);
                return react_1.default.createElement(Component, Object.assign({}, this.state, rest));
            }
        }
        WithSearch.contextType = SearchContext_1.default;
        return WithSearch;
    };
}
exports.default = withSearch;
