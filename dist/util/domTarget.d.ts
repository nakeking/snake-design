import { MutableRefObject } from "react";
declare type TargetValue<T> = T | undefined | null;
declare type TargetType = Element | Window | Document | HTMLElement;
export declare type BasicTarget<T extends TargetType = Element> = (() => TargetValue<T>) | TargetValue<T> | MutableRefObject<TargetValue<T>>;
/**
 * @description:
 * @param { Element | Window | Document | HTMLElement | undefined } defaultElement
 * @return {*}
 */
export declare function getTargetElement<T extends TargetType>(target: BasicTarget<T>, defaultElement?: T): any;
export {};
