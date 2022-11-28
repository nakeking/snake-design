import classNames from "classnames";
import React from "react";
import { Icon } from "../..";
var Option = function (props) {
    var active = props.active, value = props.value, children = props.children, onSelect = props.onSelect;
    var classes = classNames('select-item', {
        'active': active
    });
    var handleClick = function (evt, data) {
        evt.stopPropagation();
        onSelect && onSelect(data);
    };
    return (React.createElement("div", { className: classes, onClick: function (evt) { return handleClick(evt, value); } },
        children,
        active ? React.createElement(Icon, { type: "check" }) : null));
};
export default Option;
