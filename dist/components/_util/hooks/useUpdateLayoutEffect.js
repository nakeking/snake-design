import { useLayoutEffect, useState } from 'react';
export function useUpdateLayoutEffect(callback, depend) {
    var _a = useState(false), status = _a[0], setStatus = _a[1];
    useLayoutEffect(function () {
        if (status) {
            callback();
        }
        else {
            setStatus(true);
        }
    }, depend);
}
