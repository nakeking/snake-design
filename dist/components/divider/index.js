import React from 'react';
import './_style.scss';
var Divider = function (props) {
    var message = props.message, children = props.children;
    return (React.createElement("div", { className: "divider" },
        message ? React.createElement("div", { className: "message" }, message) : null,
        React.createElement("div", { className: "message-slot" }, children),
        React.createElement("div", { className: "link" })));
};
export default Divider;
