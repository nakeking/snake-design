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
/*
 * @Author:
 * @Date: 2022-04-29 11:28:26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-18 15:21:44
 * @FilePath: \beetle-ui\src\components\Cascader\cascader.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved.
 */
import classNames from "classnames";
import React, { useRef, useState } from "react";
import CascaderContext from "./context";
import SubCascader from "./SubCascader";
import Icon from "../Icon";
import useMount from "../../hooks/useMount";
import useClickAway from "../../hooks/useClickAway";
import ResizeObserver from "resize-observer-polyfill";
import { fillFieldNames } from "../../util/commonUtil";
var defaultProps = {
    fieldNames: {
        label: "label",
        value: "value",
        children: "children",
    },
};
var Cascader = function (p) {
    var _a;
    var props = __assign(__assign({}, defaultProps), p);
    var allowClear = props.allowClear, showSearch = props.showSearch, options = props.options, fieldNames = props.fieldNames, defaultValue = props.defaultValue, disabled = props.disabled, placeholder = props.placeholder, changeOnSelect = props.changeOnSelect, onChange = props.onChange;
    // =========================== Option ===========================
    var mergedOptions = React.useMemo(function () { return options || []; }, [options]);
    // ==============================================================
    // =========================== fieldNames ===========================
    var mergedFieldNames = React.useMemo(function () { return fillFieldNames(fieldNames); }, [fieldNames]);
    // ==============================================================
    // ================== Context ===================================
    var cascaderContext = React.useMemo(function () { return ({
        options: mergedOptions,
        fieldNames: mergedFieldNames,
        changeOnSelect: changeOnSelect,
    }); }, [mergedOptions, fieldNames, changeOnSelect]);
    // ==============================================================
    var _b = useState({}), _style = _b[0], setStyle = _b[1];
    var _c = useState(""), content = _c[0], setContent = _c[1];
    var _d = useState(""), search_str = _d[0], setSearchStr = _d[1];
    var _e = useState(false), menus_status = _e[0], setMenusStatus = _e[1];
    var _f = useState(false), focused = _f[0], setFocused = _f[1];
    var cascaderRef = useRef(null);
    var menuRef = useRef(null);
    useClickAway(function () {
        var _a;
        setMenusStatus(false);
        setSearchStr("");
        setFocused(false);
        (_a = menuRef.current) === null || _a === void 0 ? void 0 : _a.ToggleBackupsData();
    }, [cascaderRef, (_a = menuRef.current) === null || _a === void 0 ? void 0 : _a.returnRef()]);
    useMount(function () {
        console.log(123);
        if (defaultValue) {
            initDefaultValue();
        }
        var resizeObserver = new ResizeObserver(function (entries) {
            entries.forEach(function (entry) {
                var _a = entry.target, offsetTop = _a.offsetTop, offsetLeft = _a.offsetLeft, offsetParent = _a.offsetParent, clientHeight = _a.clientHeight;
                setStyle({
                    left: offsetLeft,
                    top: offsetTop + offsetParent.offsetTop + clientHeight + 4,
                });
            });
        });
        resizeObserver.observe(cascaderRef === null || cascaderRef === void 0 ? void 0 : cascaderRef.current);
        return function () {
            resizeObserver.disconnect();
        };
    });
    /**
     * 默认值 初始化
     * @description:
     * @param {*}
     * @return {*}
     */
    var initDefaultValue = function () {
        var _a;
        if (defaultValue.length) {
            console.log((_a = menuRef.current) === null || _a === void 0 ? void 0 : _a.initDefaultValue(defaultValue).join(" / "));
        }
    };
    /**
     * 自定义回显内容
     * @description:
     * @param {*} content
     * @return {*}
     */
    var formatterContent = function (content) {
        return content;
    };
    /**
     * 选择框 点击事件
     * @description:
     * @param {React} evt
     * @return {*}
     */
    var handleClick = function (evt) {
        if (menus_status) {
            if (content) {
                setMenusStatus(!menus_status);
            }
        }
        else {
            setMenusStatus(!menus_status);
        }
        if (!focused) {
            setFocused(true);
        }
    };
    /**
     * 输入框查询 input事件
     * @description:
     * @param { React.ChangeEvent } evt
     * @return {*}
     */
    var handleInput = function (evt) {
        setSearchStr(evt.target.value);
    };
    /**
     * 下拉菜单选择事件
     * @description:
     * @param {SelectedType} data
     * @return {*}
     */
    var handleSelect = function (data) {
        var _a;
        setContent(data.labels.join(" / "));
        setSearchStr("");
        setMenusStatus(false);
        var result = [];
        for (var i = 0; i < data.values.length; i++) {
            var obj = (_a = {},
                _a[fieldNames.label] = data.labels[i],
                _a[fieldNames.value] = data.values[i],
                _a);
            result.push(obj);
        }
        onChange && onChange(data.values);
    };
    var handleClear = function () {
        var _a;
        setContent("");
        (_a = menuRef.current) === null || _a === void 0 ? void 0 : _a.clear();
        setMenusStatus(false);
    };
    return (React.createElement(CascaderContext.Provider, { value: cascaderContext },
        React.createElement("div", { ref: cascaderRef, className: classNames("v-cascader-wrap", {
                "v-cascader-clear": allowClear && content,
                "v-cascader-focused": focused,
                "v-cascader-disabled": disabled,
            }) },
            React.createElement("div", { className: classNames("v-cascader-selector", {
                    "v-cascader-selected": menus_status,
                }), onClick: handleClick },
                React.createElement("span", { className: classNames("v-cascader-search", {
                        "v-cascader-customize-input": showSearch,
                    }) },
                    React.createElement("input", { className: classNames("v-cascader-input", {
                            "v-cascader-input-opacity": !showSearch,
                        }), type: "search", autoComplete: "off", value: search_str, onInput: handleInput })),
                !content && !search_str ? (React.createElement("span", { className: "v-cascader-placeholder" }, placeholder)) : null,
                !search_str ? (React.createElement("span", { className: "v-cascader-item" }, formatterContent(content))) : null),
            React.createElement("span", { className: "v-cascader-icon down" },
                React.createElement(Icon, { type: "down" })),
            React.createElement("span", { className: "v-cascader-icon clear", onClick: handleClear },
                React.createElement(Icon, { type: "close" })),
            React.createElement(SubCascader, { _style: _style, menusStatus: menus_status, searchValue: search_str, showSearch: showSearch, onSelect: handleSelect, ref: menuRef }))));
};
Cascader.displayName = "Cascader";
Cascader.defaultProps = {
    allowClear: true,
    showSearch: false,
    changeOnSelect: false,
};
export default Cascader;
