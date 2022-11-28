import React from 'react';
import { PresetColorTypes } from '../_util/colors';
import classNames from 'classnames';
import { Icon } from '..';
function isPresetColor(color) {
    return PresetColorTypes.indexOf(color) !== -1;
}
var Tag = function (props) {
    var _a;
    var color = props.color, closable = props.closable, children = props.children, onClose = props.onClose;
    var classes = classNames('snake-tag', (_a = {},
        _a["snake-tag-" + color] = isPresetColor(color),
        _a['snake-tag-color'] = !isPresetColor(color) && color,
        _a));
    var style = !isPresetColor(color) ? {
        backgroundColor: color
    } : {};
    var handleClose = function (evt) {
        evt.stopPropagation();
        onClose && onClose();
    };
    return (React.createElement("span", { className: classes, style: style },
        children,
        closable ? React.createElement(Icon, { className: "snake-tag-close-icon", type: "close", onClick: handleClose }) : null));
};
export default Tag;
