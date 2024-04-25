/// <reference types="react" />
import PropTypes from "prop-types";
declare function WithSearch({ mapContextToProps, children }: {
    mapContextToProps: any;
    children: any;
}): JSX.Element;
declare namespace WithSearch {
    var propTypes: {
        mapContextToProps: PropTypes.Requireable<(...args: any[]) => any>;
        children: PropTypes.Validator<(...args: any[]) => any>;
    };
}
export default WithSearch;
