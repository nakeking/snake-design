export var useDebounce = function (fn, delay) {
    if (delay === void 0) { delay = 500; }
    var timer;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            fn.apply(void 0, args);
            timer = null;
        }, delay);
    };
};
