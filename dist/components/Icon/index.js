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
import React from 'react';
import classNames from 'classnames';
import omit from '../_util/omit';
var Icon = function (props) {
    var _a;
    var type = props.type, spin = props.spin, style = props.style, fill = props.fill, className = props.className, onClick = props.onClick, children = props.children;
    var classes = classNames((_a = {
            anticon: true
        },
        _a["anticon-" + type] = true,
        _a), className);
    var iconClassName = classNames({
        'anticon-spin': !!spin || type === 'loading',
    });
    var handleClick = function (evt) {
        onClick && onClick(evt);
    };
    return (React.createElement("span", { className: classes, style: style, onClick: handleClick },
        React.createElement("svg", __assign({ className: iconClassName }, omit(props, ['className', 'style', 'type', 'spin', 'children'])),
            React.createElement("use", { xlinkHref: "#snake-" + type }))));
};
export default Icon;
