import isBrower from "./isBrower";
/**
 * @description:
 * @param { Element | Window | Document | HTMLElement | undefined } defaultElement
 * @return {*}
 */
export function getTargetElement(target, defaultElement) {
    if (!isBrower) {
        return undefined;
    }
    if (!target) {
        return defaultElement;
    }
    var targetElement;
    if (typeof target === "function") {
        targetElement = target();
    }
    else if ("current" in target) {
        targetElement = target.current;
    }
    else {
        targetElement = target;
    }
    return targetElement;
}
