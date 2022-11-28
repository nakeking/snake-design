export var Thottle = function (fn, delay) {
    var flag = false;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var self = this;
        if (flag)
            return;
        flag = true;
        setTimeout(function () {
            flag = false;
            fn.apply(self, args);
        }, delay);
    };
};
export var Debounce = function (fn, delay) {
    var timer;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (timer)
            clearTimeout(timer);
        var self = this;
        timer = setTimeout(function () {
            fn.apply(self, args);
        }, delay);
    };
};
