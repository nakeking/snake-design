import { useRef, useEffect } from "react";
var createUpdateEffect = function (hook) { return function (effect, deps) {
    var isMounted = useRef(false);
    hook(function () {
        return function () {
            isMounted.current = false;
        };
    }, []);
    hook(function () {
        if (!isMounted.current) {
            isMounted.current = true;
        }
        else {
            return effect();
        }
    }, deps);
}; };
export default createUpdateEffect(useEffect);
