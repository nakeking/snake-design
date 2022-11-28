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
import React, { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import { getElementStyle } from '../_util/util';
import { useUpdateLayoutEffect } from "../_util/hooks/useUpdateLayoutEffect";
import { RenderSelect } from '../select';
import Input from '../input';
var AutoComplete = function (_a) {
    var props = __rest(_a, []);
    var options = props.options, children = props.children, filterOption = props.filterOption, onSearch = props.onSearch, onSelect = props.onSelect, otherProps = __rest(props, ["options", "children", "filterOption", "onSearch", "onSelect"]);
    var inputRef = useRef(null);
    var _b = useState(true), hidden = _b[0], setHidden = _b[1];
    var onlyId = useState(nanoid())[0];
    var _c = useState(''), inputValue = _c[0], setValue = _c[1];
    var _d = useState(options), option_data = _d[0], setOptions = _d[1];
    var _e = useState({}), style = _e[0], setStyle = _e[1];
    var AutoCompleteRef = useRef(null);
    useUpdateLayoutEffect(function () {
        if (filterOption) {
            var result = options === null || options === void 0 ? void 0 : options.filter(function (item) { return filterOption && filterOption(inputValue, item); });
            setOptions(result);
        }
    }, [inputValue]);
    useEffect(function () {
        var auto_offset_data = getElementStyle(AutoCompleteRef);
        setStyle(auto_offset_data);
    }, [AutoCompleteRef]);
    useEffect(function () {
        setOptions(options);
    }, [onSearch]);
    var hanbleBlur = function (evt) {
        setHidden(true);
    };
    var hanbleFocus = function (evt) {
        if (inputValue) {
            setHidden(false);
        }
    };
    var hanbleChange = function (evt) {
        setValue(evt.target.value);
        if (evt.target.value) {
            setHidden(false);
        }
        else {
            setHidden(true);
        }
        if (evt.target.value && onSearch) {
            onSearch(evt.target.value);
        }
    };
    var handleSelect = function (value) {
        setValue(value);
    };
    return (React.createElement("div", { className: "snake-auto-complete", ref: AutoCompleteRef },
        React.createElement("div", { className: "snake-auto-search" },
            React.createElement(Input, __assign({ value: inputValue, onChange: hanbleChange, onBlur: hanbleBlur, onFocus: hanbleFocus }, otherProps)),
            option_data && RenderSelect({
                id: onlyId,
                hidden: hidden,
                options: option_data,
                style: style,
                onSelect: onSelect,
                handleSelect: handleSelect
            }))));
};
AutoComplete.displayName = 'Example';
export default AutoComplete;
