import { useEffect } from 'react';
function useClickOutside(ref, callback) {
    useEffect(function () {
        var lister = function (event) {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            callback(event);
        };
        document.addEventListener('click', lister);
        return function () {
            document.removeEventListener('click', lister);
        };
    }, [ref, callback]);
}
export default useClickOutside;
