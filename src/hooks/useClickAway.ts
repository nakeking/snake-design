/*
 * @Author:
 * @Date: 2022-05-03 13:13:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-05-03 14:00:29
 * @FilePath: \beetle-ui\src\hooks\useClickAway.ts
 * @Description: 监听目标元素外的点击事件。
 *
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved.
 */
import { useEffect } from "react";
import type { BasicTarget } from "../util/domTarget";
import { getTargetElement } from "../util/domTarget";
import useUnmount from "./useUnMount";

export default function useClickAway<T extends Event = Event>(
  onClickAway: (event: T) => void,
  target: BasicTarget | BasicTarget[],
  eventName: string | string[] = "click"
) {
  useEffect(() => {
    const handler = (event: any) => {
      const targets = Array.isArray(target) ? target : [target];

      if (
        targets.some((item) => {
          const targetElement = getTargetElement(item);
          return !targetElement || targetElement?.contains(event.target);
        })
      ) {
        return;
      }

      onClickAway(event);
    };

    const eventNames = Array.isArray(eventName) ? eventName : [eventName];

    eventNames.forEach((event) => document.addEventListener(event, handler));

    return () => {
      eventNames.forEach((event) =>
        document.removeEventListener(event, handler)
      );
    };
  }, [target, eventName]);
}
