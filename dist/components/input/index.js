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
import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { Icon } from "..";
import { useUpdateLayoutEffect } from "../_util/hooks/useUpdateLayoutEffect";
var Input = function (props) {
    var type = props.type, size = props.size, prefix = props.prefix, suffix = props.suffix, addonBefore = props.addonBefore, addonAfter = props.addonAfter, value = props.value, allowClear = props.allowClear, _style = props.style, inputProps = __rest(props, ["type", "size", "prefix", "suffix", "addonBefore", "addonAfter", "value", "allowClear", "style"]);
    var inputRef = useRef(null);
    var _a = useState(false), _focused = _a[0], setFocused = _a[1];
    var _b = useState(value), _value = _b[0], setValue = _b[1];
    var _c = useState(type), _type = _c[0], setType = _c[1];
    var _d = useState('eye_invisible'), passwrod_icon = _d[0], setPasswordIcon = _d[1];
    useEffect(function () {
        setValue(value);
    }, [value]);
    useUpdateLayoutEffect(function () {
        var _a;
        (_a = inputRef === null || inputRef === void 0 ? void 0 : inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    }, [_type]);
    var classes = classNames('snake-input-wrapper', {
        'snake-input-focused': _focused,
        'snake-input-affix-wrapper-disabled': inputProps.disabled
    });
    var inputClassNames = classNames('snake-input', {
        'snake-input-disabled': inputProps.disabled
    });
    var handleClick = function (evt) {
        var _a;
        (_a = inputRef === null || inputRef === void 0 ? void 0 : inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    };
    var hanbleChange = function (evt) {
        setValue(evt.target.value);
        var onChange = inputProps.onChange;
        onChange && onChange(evt);
    };
    var hanblleFocused = function (evt) {
        setFocused(true);
        var onFocus = inputProps.onFocus;
        onFocus && onFocus(evt);
    };
    var hanbleBlur = function (evt) {
        setFocused(false);
        var onBlur = inputProps.onBlur;
        onBlur && onBlur(evt);
    };
    var closeValue = function (evt) {
        evt.stopPropagation();
        setValue("");
    };
    var togglePassword = function (evt) {
        evt.stopPropagation();
        setPasswordIcon(passwrod_icon == 'eye' ? 'eye_invisible' : 'eye');
        setType(passwrod_icon == 'eye' ? 'password' : 'text');
    };
    return (React.createElement("div", { className: classes, onClick: handleClick },
        addonBefore,
        prefix,
        React.createElement("input", __assign({ style: _style, ref: inputRef, className: inputClassNames }, inputProps, { type: _type, value: fixControlledValue(_value), onChange: hanbleChange, onFocus: hanblleFocused, onBlur: hanbleBlur })),
        React.createElement("span", { className: "snake-input-suffix " },
            type === 'password' ? React.createElement(Icon, { type: passwrod_icon, onClick: togglePassword }) : null,
            allowClear ? React.createElement(Icon, { type: "close", onClick: closeValue }) : null),
        suffix,
        addonAfter));
};
function fixControlledValue(value) {
    if (typeof value === 'undefined' || value === null) {
        return '';
    }
    return value;
}
export default Input;
