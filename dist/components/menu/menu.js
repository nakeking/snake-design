import React, { useState, useMemo, createContext } from 'react';
import classNames from 'classnames';
export var MenuContext = createContext({ index: '0', mode: 'horizontal' });
var Menu = function (props) {
    var defaultSelectedKeys = props.defaultSelectedKeys, mode = props.mode, children = props.children, defaultOpenKeys = props.defaultOpenKeys, _className = props.className, onSelect = props.onSelect;
    var _a = useState(defaultSelectedKeys), currentActive = _a[0], setActive = _a[1];
    var handleClick = function (index) {
        setActive(index);
        if (onSelect)
            onSelect(index);
    };
    var contextObj = useMemo(function () { return ({
        index: currentActive ? currentActive : '0',
        mode: mode,
        onSelect: handleClick
    }); }, [currentActive]);
    var classes = classNames('snake-menu', _className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode === 'horizontal'
    });
    var renderChildren = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElement, {
                    index: "" + index
                });
            }
            else {
                console.error('Warning: The element is not MenuItem');
            }
        });
    };
    return (React.createElement("ul", { className: classes, "data-testid": "menu-test" },
        React.createElement(MenuContext.Provider, { value: contextObj }, renderChildren())));
};
Menu.defaultProps = {
    defaultSelectedKeys: '0',
    mode: 'horizontal'
};
export default Menu;
