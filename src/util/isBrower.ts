/*
 * @Author:
 * @Date: 2022-05-03 12:57:09
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-05-03 12:57:09
 * @FilePath: \beetle-ui\src\util\isBrower.ts
 * @Description:
 *
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved.
 */
const isBrower = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);

export default isBrower;
