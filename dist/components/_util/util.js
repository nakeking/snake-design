export var getElementStyle = function (baseRef) {
    var _a, _b, _c;
    var width = ((_a = baseRef.current) === null || _a === void 0 ? void 0 : _a.clientWidth) || 0;
    var left = ((_b = baseRef.current) === null || _b === void 0 ? void 0 : _b.getBoundingClientRect().left) || 0;
    var top = ((_c = baseRef.current) === null || _c === void 0 ? void 0 : _c.getBoundingClientRect().top) || 0;
    top += 38;
    return {
        width: width,
        left: left,
        top: top
    };
};
