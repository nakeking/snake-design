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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/*
 * @Author:
 * @Date: 2022-04-29 11:28:26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-19 15:06:10
 * @FilePath: \beetle-ui\src\components\Cascader\SubCascader.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved.
 */
import classNames from "classnames";
import React, { useState, useMemo, useImperativeHandle, useRef, useContext, } from "react";
import { createPortal } from "react-dom";
import CascaderContext from "./context";
import Icon from "../Icon";
import useUpdateEffect from "../../hooks/useUpdateEffect";
var SubCascader = React.forwardRef(function (props, ref) {
    var _style = props._style, menusStatus = props.menusStatus, searchValue = props.searchValue, showSearch = props.showSearch, onSelect = props.onSelect;
    var context = useContext(CascaderContext);
    // if (!context) return;
    var options = context.options, fieldNames = context.fieldNames;
    var value_key = fieldNames.value, label_key = fieldNames.label, children_key = fieldNames.children;
    var menuRef = useRef(null);
    var _a = useState([]), menus_data = _a[0], setMenusData = _a[1];
    var menus_search = useState([])[0];
    var _b = useState([]), menus_arr = _b[0], setMenusArr = _b[1];
    var _c = useState([]), search_arr = _c[0], setSearchArr = _c[1];
    var _d = useState({
        values: [],
        labels: [],
        items: [],
        indexs: [],
    }), selected = _d[0], setSelected = _d[1];
    var _e = useState(false), selected_status = _e[0], setSelectedStatus = _e[1];
    var _f = useState({}), backups_data = _f[0], setBackUpsData = _f[1];
    /**
     * options 初始化
     * @description:
     * @param {*}
     * @return {*}
     */
    var recursion = function (data, level, parent) {
        return data.map(function (item, index) {
            var _a;
            var obj = Object.assign(item, { level: level }, parent
                ? {
                    values: __spreadArray(__spreadArray([], parent.values, true), [item[value_key]], false),
                    labels: __spreadArray(__spreadArray([], parent.labels, true), [item[label_key]], false),
                    indexs: __spreadArray(__spreadArray([], parent.indexs, true), [index], false),
                }
                : {
                    values: [item[value_key]],
                    labels: [item[label_key]],
                    indexs: [index],
                });
            // ================= 如果有children，递归格式化数据 =======================
            if (obj[children_key]) {
                obj.leaf = false;
                obj[children_key] = recursion(obj[children_key], level + 1, obj);
            }
            else {
                obj.leaf = true;
                // =============== 初始化可搜索数据 ====================================
                if (showSearch) {
                    menus_search.push(__assign(__assign({}, obj), (_a = { leaf: true }, _a[label_key] = obj.labels.join(" / "), _a[value_key] = obj.values.join(" / "), _a)));
                }
            }
            return obj;
        });
    };
    useUpdateEffect(function () {
        console.time();
        setMenusData(recursion(options, 0));
        console.timeEnd();
    }, [options]);
    useUpdateEffect(function () {
        setMenusArr([menus_data]);
    }, [menus_data]);
    useUpdateEffect(function () {
        if (typeof showSearch === "object") {
            var list = menus_search.filter(function (item) {
                return showSearch.filter(searchValue, item);
            });
            setSearchArr([list]);
        }
        else if (searchValue) {
            var list = menus_search.filter(function (item) {
                if (item[label_key].indexOf(searchValue) > -1) {
                    return item;
                }
                return false;
            });
            setSearchArr([list]);
        }
        else {
            setSearchArr([]);
        }
    }, [searchValue]);
    useUpdateEffect(function () {
        if (selected_status) {
            onSelect && onSelect(selected);
            initBackupsData();
        }
    }, [selected]);
    useImperativeHandle(ref, function () { return ({
        returnRef: function () {
            return menuRef;
        },
        ToggleBackupsData: function () {
            var backups_menus_arr = backups_data.menus_arr, backups_values = backups_data.values, backups_labels = backups_data.labels, backups_items = backups_data.items, backups_indexs = backups_data.indexs;
            var items = selected.items;
            if (menus_arr && backups_menus_arr) {
                if (items.length && !items[items.length - 1].leaf) {
                    setSelected({
                        values: backups_values,
                        labels: backups_labels,
                        items: backups_items,
                        indexs: backups_indexs,
                    });
                    setMenusArr(backups_menus_arr);
                }
            }
        },
        initDefaultValue: function (data) {
            console.log(data);
            return [];
        },
        clear: function () {
            setSelected({
                values: [],
                labels: [],
                items: [],
                indexs: [],
            });
            setMenusArr([menus_data]);
            setBackUpsData({});
        },
    }); });
    /**
     * 选项选择触发事件
     * @description: Old Wang
     * @param {optionType} item
     * @return {*}
     */
    var handleSelect = function (item) {
        if (item.disabled) {
            return false;
        }
        if (searchValue) {
            handleSearchSelect(item);
        }
        else {
            handleBaseSelect(item);
        }
    };
    /**
     * 搜索模式 搜索选择选项
     * @description: Old Wang
     * @param {optionType} item
     * @return {*}
     */
    var handleSearchSelect = function (item) {
        // =============== 更新下拉列表数据 ==========================
        var indexs = item.indexs;
        var max = indexs.length;
        var layer = 0;
        var curr_layer_menu = menus_data;
        var result_menu = [];
        while (layer < max) {
            if (layer === 0) {
                result_menu.push(curr_layer_menu);
            }
            else {
                if (curr_layer_menu[indexs[layer - 1]][children_key] &&
                    curr_layer_menu[indexs[layer - 1]][children_key].length) {
                    curr_layer_menu = curr_layer_menu[indexs[layer - 1]][children_key];
                    result_menu.push(curr_layer_menu);
                }
            }
            layer++;
        }
        setMenusArr(result_menu);
        // ================ 更新选择项 ===============================
        var result = {
            values: item.values,
            labels: item.labels,
        };
        setSelected(__assign(__assign({}, selected), result));
        // ================ onSelect ================================
        onSelect && onSelect(result);
    };
    /**
     * 正常选择选项
     * @description: Old Wang
     * @param {optionType} item
     * @return {*}
     */
    var handleBaseSelect = function (item) {
        if (item.leaf) {
            setMenusArr(menus_arr.slice(0, item.level + 1));
            setSelectedStatus(true);
        }
        else {
            var arr = menus_arr.slice(0, item.level + 1);
            arr[item.level + 1] = item[children_key];
            console.log(arr);
            setMenusArr(arr);
            setSelectedStatus(false);
        }
        var values = selected.values, labels = selected.labels, items = selected.items;
        values = values.slice(0, item.level + 1);
        values[item.level] = item[value_key];
        labels = labels.slice(0, item.level + 1);
        labels[item.level] = item[label_key];
        items = items.slice(0, item.level + 1);
        items[item.level] = item;
        setSelected({ values: values, labels: labels, items: items });
    };
    var handleMouseDown = function (evt) {
        evt.preventDefault();
    };
    var initBackupsData = function () {
        var values = selected.values, labels = selected.labels, items = selected.items;
        setBackUpsData({
            menus_arr: __spreadArray([], menus_arr, true),
            values: __spreadArray([], values, true),
            labels: __spreadArray([], labels, true),
            items: __spreadArray([], items, true),
        });
    };
    var renderCascaderMenu = useMemo(function () {
        var options = searchValue ? search_arr : menus_arr;
        return options.map(function (menu, i) {
            return (React.createElement("ul", { className: "v-cascader-menu", key: i }, menu.length ? (menu.map(function (item, index) {
                var _a;
                return (React.createElement("li", { key: item[value_key], className: classNames("v-cascader-menu-item", {
                        "v-cascader-menu-item-disabled": item.disabled,
                        "v-cascader-menu-item-active": (_a = selected.values) === null || _a === void 0 ? void 0 : _a.includes(item[value_key]),
                    }), onClick: function () { return handleSelect(item); }, onMouseDown: function (evt) { return handleMouseDown(evt); } },
                    React.createElement("div", { className: "v-cascader-menu-item-content" }, item[label_key]),
                    !item.leaf ? (React.createElement("div", { className: "v-cascader-menu-item-icon" },
                        React.createElement(Icon, { type: "angle-right" }))) : null));
            })) : (React.createElement("div", { className: "v-cascader-null" }, "\u6682\u65E0\u6570\u636E"))));
        });
    }, [menus_arr, search_arr]);
    return createPortal(React.createElement("div", { style: {
            position: "absolute",
            width: "100%",
            left: 0,
            top: 0,
        }, ref: menuRef },
        React.createElement("div", null,
            React.createElement("div", { className: classNames("v-cascader-dropdown", {
                    "v-cascader-dropdown-hidden": !menusStatus,
                }), style: _style },
                React.createElement("div", { className: "v-cascader-menus" }, renderCascaderMenu)))), document.body);
});
export default SubCascader;
