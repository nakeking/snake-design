import { useState, useEffect } from 'react';
// TODO 拓展回调版本
function useDebounce(value, delay) {
    if (delay === void 0) { delay = 500; }
    var _a = useState(value), state = _a[0], setstate = _a[1];
    useEffect(function () {
        var timer = setTimeout(function () {
            setstate(value);
        }, delay);
        return function () {
            clearTimeout(timer);
        };
    }, [value]);
    return state;
}
export default useDebounce;
