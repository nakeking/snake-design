/*
 * @Author:
 * @Date: 2022-05-03 12:56:32
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-05-03 18:29:38
 * @FilePath: \beetle-ui\src\util\domTarget.ts
 * @Description:
 *
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved.
 */
import { MutableRefObject } from "react";
import isBrower from "./isBrower";

type TargetValue<T> = T | undefined | null;

type TargetType = Element | Window | Document | HTMLElement;

export type BasicTarget<T extends TargetType = Element> =
  | (() => TargetValue<T>)
  | TargetValue<T>
  | MutableRefObject<TargetValue<T>>;

/**
 * @description:
 * @param { Element | Window | Document | HTMLElement | undefined } defaultElement
 * @return {*}
 */
export function getTargetElement<T extends TargetType>(
  target: BasicTarget<T>,
  defaultElement?: T
) {
  if (!isBrower) {
    return undefined;
  }

  if (!target) {
    return defaultElement;
  }

  let targetElement;

  if (typeof target === "function") {
    targetElement = target();
  } else if ("current" in target) {
    targetElement = target.current;
  } else {
    targetElement = target;
  }

  return targetElement;
}
