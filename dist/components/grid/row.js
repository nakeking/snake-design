import React from 'react';
import classNames from 'classnames';
import RowContext from './RowContext';
var Row = function (props) {
    var gutter = props.gutter, children = props.children;
    gutter = Array.isArray(gutter) ? gutter : [gutter || 0, 0];
    var classes = classNames('snake-row', {
        'snake-row-gutter': gutter && gutter[1] > 0
    });
    return (React.createElement(RowContext.Provider, { value: { gutter: gutter } },
        React.createElement("div", { className: classes }, children)));
};
export default Row;
