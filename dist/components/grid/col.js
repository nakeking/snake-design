var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import classNames from 'classnames';
import React, { useContext } from 'react';
import RowContext from './RowContext';
var Col = function (props) {
    var _a;
    var span = props.span, children = props.children;
    var gutter = useContext(RowContext).gutter;
    var _style = gutter ? __assign(__assign({}, (gutter[0] ? {
        paddingLeft: gutter[0] / 2,
        paddingRight: gutter[0] / 2
    } : {})), (gutter[1] ? {
        paddingTop: gutter[1] / 2,
        paddingBottom: gutter[1] / 2
    } : {})) : {};
    var classes = classNames('snake-col', (_a = {},
        _a["snake-col-" + span] = span,
        _a));
    return (React.createElement("div", { className: classes, style: _style }, children));
};
export default Col;
