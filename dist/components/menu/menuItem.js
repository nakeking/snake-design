import React, { useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
var MenuItem = function (props) {
    var index = props.index, _className = props.className, disabled = props.disabled, children = props.children;
    var _a = useContext(MenuContext), _indexFromMenu = _a.index, onSelect = _a.onSelect;
    var handleClick = function () {
        if (onSelect && !disabled && (typeof index === 'string'))
            onSelect(index);
    };
    var classes = classNames('menu-item', _className, {
        'is-disabled': disabled,
        'menu-item-active': index === _indexFromMenu
    });
    return (React.createElement("li", { className: classes, onClick: handleClick }, children));
};
MenuItem.displayName = 'MenuItem';
export default MenuItem;
