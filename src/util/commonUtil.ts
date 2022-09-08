/*
 * @Author:
 * @Date: 2022-05-30 18:22:22
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-19 15:04:16
 * @FilePath: \beetle-ui\src\util\commonUtil.ts
 * @Description:
 *
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved.
 */
import type { fieldNamesType } from "../components/Cascader/cascader";

export function fillFieldNames(fieldNames): fieldNamesType {
  const { label, value, children } = fieldNames || {};
  return {
    label: label || "label",
    value: value || "value",
    children: children || "children",
  };
}
