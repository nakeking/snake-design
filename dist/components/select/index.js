var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from "react-dom";
import { useUpdateLayoutEffect } from '../_util/hooks/useUpdateLayoutEffect';
import Input from '../input';
import Option from './option';
import Tag from '../tag';
import { Icon } from '..';
import { nanoid } from 'nanoid';
import { getElementStyle } from '../_util/util';
function isSelect(value) {
    return value && value.length;
}
var Select = function (props) {
    var _style = props.style, placeholder = props.placeholder, showSearch = props.showSearch, loading = props.loading, mode = props.mode, disabled = props.disabled, options = props.options;
    var onlyId = nanoid();
    var _a = useState(true), hidden = _a[0], setHidden = _a[1];
    var _b = useState({}), style = _b[0], setStyle = _b[1];
    var _c = useState(options || []), option_data = _c[0], setOptions = _c[1];
    var _d = useState(mode ? [] : ''), value = _d[0], setValue = _d[1];
    var SelectRef = useRef(null);
    var classes = classNames('snake-select-wrap', {
        'snake-select-focused': !hidden,
        'snake-select-multiple': mode === 'multiple',
        'snake-select-affix-wrapper-disabled': disabled
    });
    useEffect(function () {
        setOptions(options || []);
    }, [options]);
    useEffect(function () {
        var select_offset_data = getElementStyle(SelectRef);
        setStyle(select_offset_data);
    }, [SelectRef]);
    var handleClick = function (evt) {
        setHidden(!hidden);
    };
    var handleBlur = function (evt) {
        setHidden(true);
    };
    var handleSelect = function (data) {
        setValue(data);
    };
    var closeTag = function (index) {
        var base = JSON.parse(JSON.stringify(value));
        base.splice(index, 1);
        setValue(base);
    };
    return (React.createElement("div", { className: classes, style: _style, ref: SelectRef, tabIndex: 0, onClick: handleClick, onBlur: handleBlur },
        React.createElement("div", { className: "snake-select-selector" },
            showSearch ? React.createElement("div", { className: "snake-select-selection-search" },
                React.createElement(Input, { style: {
                        opacity: showSearch ? 1 : 0
                    }, disabled: disabled })) : null,
            mode ? React.createElement("div", { className: "snake-select-selection-overflow" }, value.map(function (item, index) {
                return React.createElement("div", { className: "snake-select-selection-overflow-item", key: item },
                    React.createElement(Tag, { closable: true, onClose: function () { return closeTag(index); } }, item));
            })) : React.createElement("div", { className: "snake-select-selection-item" }, value),
            placeholder && !isSelect(value) ? React.createElement("div", { className: "snake-select-selection-placeholder" }, placeholder) : null,
            loading ? React.createElement(Icon, { type: "loading" }) : React.createElement(Icon, { type: "down" })),
        options && RenderSelect({
            id: onlyId,
            hidden: hidden,
            options: option_data,
            value: value,
            style: style,
            mode: mode,
            handleSelect: handleSelect
        })));
};
var renderSelectProps = /** @class */ (function () {
    function renderSelectProps() {
        this.options = [];
        this.hidden = false;
    }
    return renderSelectProps;
}());
export var RenderSelect = function (props) {
    var _a;
    var mode = props.mode, inputRef = props.inputRef, id = props.id, value = props.value, options = props.options, hidden = props.hidden, _style = props.style, onSelect = props.onSelect, handleSelect = props.handleSelect;
    /**进入动画 */
    var _b = useState(false), enter = _b[0], setEnter = _b[1];
    /**退出动画 */
    var _c = useState(false), leave = _c[0], setLeave = _c[1];
    /**display none */
    var _d = useState(hidden), _hidden = _d[0], setHidden = _d[1];
    var classes = classNames("snake-search-select", {
        "snake-select-hidden": _hidden,
        "snake-option-enter": enter,
        "snake-option-leave": leave
    });
    useUpdateLayoutEffect(function () {
        if (hidden) {
            setEnter(false);
            setLeave(true);
        }
        else {
            setEnter(true);
            setLeave(false);
            setHidden(false);
        }
    }, [hidden]);
    /**optionRef */
    var optionRef = useRef(null);
    /**动画监听 */
    (_a = optionRef.current) === null || _a === void 0 ? void 0 : _a.addEventListener('webkitAnimationEnd', function (evt) {
        if (evt.target === evt.currentTarget) {
            if (enter && !leave) {
                setHidden(false);
            }
            if (leave && !enter) {
                setHidden(true);
                setLeave(false);
            }
        }
    }, false);
    /**选择事件 */
    var _e = useState(value || ''), select = _e[0], setSelect = _e[1];
    useEffect(function () {
        setSelect(value || '');
    }, [value]);
    var handleClick = function (data, status) {
        if (status) {
            setSelect(mode ? __spreadArray(__spreadArray([], select, true), [data], false) : [data]);
            var result = mode ? __spreadArray(__spreadArray([], select, true), [data], false).map(function (item) { return item; }) : data;
            handleSelect && handleSelect(result);
            onSelect && onSelect(data);
        }
        else {
            setSelect(mode ? select.filter(function (item) { return item !== data; }) : []);
            var result = mode ? select.filter(function (item) { return item !== data; }).map(function (item) { return item; }) : '';
            handleSelect && handleSelect(result);
            onSelect && onSelect(data);
        }
    };
    return ReactDOM.createPortal(React.createElement("div", { style: { position: 'absolute', width: '100%', left: 0, top: 0 } },
        React.createElement("div", null, options.length ? React.createElement("div", { ref: optionRef, className: classes, style: _style, id: id }, options === null || options === void 0 ? void 0 : options.map(function (item, index) {
            var active = mode ? select.some(function (sitem) { return sitem == item.value; }) : select[0] === item.label;
            return (React.createElement(Option, { key: item.label, active: active, value: item.value, onSelect: function () { return handleClick(item.value, !active); } }, item.value));
        })) : null)), document.body);
};
Select.Option = Option;
export default Select;
