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
import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import { CSSTransition } from 'react-transition-group';
var SubMenu = function (props) {
    var index = props.index, title = props.title, className = props.className, children = props.children;
    var _a = useContext(MenuContext), _indexFromMenu = _a.index, onSelect = _a.onSelect, mode = _a.mode, defaultOpenKeys = _a.defaultOpenKeys;
    var visible = index && mode === 'vertical' ? defaultOpenKeys === null || defaultOpenKeys === void 0 ? void 0 : defaultOpenKeys.includes(index) : false;
    var _b = useState(visible), menu_visible = _b[0], ToggleSubMenu = _b[1];
    var classes = classNames('menu-item menu-sub-item', className, {
        "menu-item-active": index === _indexFromMenu,
        'is-opened': menu_visible,
        'is-vertical': mode === "vertical"
    });
    var ClickEvents = mode === "vertical" ? {
        onClick: function (e) {
            e.preventDefault();
            ToggleSubMenu(!menu_visible);
        }
    } : {};
    var handleHover = function (e, visible) {
        ToggleSubMenu(visible);
    };
    var HoverEvents = mode === 'vertical' ? {
        onmouseenter: function (e) { return handleHover(e, true); },
        onmouseleave: function (e) { return handleHover(e, false); }
    } : {};
    var renderChildren = function () {
        var classes = classNames("snake-submenu", {
            "snake-submenu-open": menu_visible
        });
        var childComponent = React.Children.map(children, function (child, i) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === "MenuItem") {
                return React.cloneElement(childElement, {
                    index: index + "-" + i
                });
            }
            else {
                console.error("Warning: The element is not MenuItem");
            }
        });
        return (React.createElement(CSSTransition, { in: menu_visible, classNames: "subMenuAnimation", timeout: 300, unmountOnExit: true, appear: true },
            React.createElement("ul", { className: classes, "data-testid": "sub-menu-wrapper" }, childComponent)));
    };
    return (React.createElement("li", __assign({ className: classes }, handleHover),
        React.createElement("div", __assign({ className: "submenu-title" }, ClickEvents),
            React.createElement("span", { className: "submenu-title-text" }, title)),
        renderChildren()));
};
SubMenu.displayName = "SubMenu";
export default SubMenu;
