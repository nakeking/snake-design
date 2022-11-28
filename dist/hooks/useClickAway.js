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
import { getTargetElement } from "../util/domTarget";
export default function useClickAway(onClickAway, target, eventName) {
    if (eventName === void 0) { eventName = "click"; }
    useEffect(function () {
        var handler = function (event) {
            var targets = Array.isArray(target) ? target : [target];
            if (targets.some(function (item) {
                var targetElement = getTargetElement(item);
                return !targetElement || (targetElement === null || targetElement === void 0 ? void 0 : targetElement.contains(event.target));
            })) {
                return;
            }
            onClickAway(event);
        };
        var eventNames = Array.isArray(eventName) ? eventName : [eventName];
        eventNames.forEach(function (event) { return document.addEventListener(event, handler); });
        return function () {
            eventNames.forEach(function (event) {
                return document.removeEventListener(event, handler);
            });
        };
    }, [target, eventName]);
}
