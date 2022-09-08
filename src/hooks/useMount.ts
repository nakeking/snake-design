/*
 * @Author:
 * @Date: 2022-05-03 13:15:46
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-05-03 17:54:27
 * @FilePath: \beetle-ui\src\hooks\useMount.ts
 * @Description: 只在组件初始化时执行的 Hook。
 *
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved.
 */
import { useEffect } from "react";

const useMount = (fn: () => void) => {
  if (process.env.NODE_ENV === "development") {
    if (typeof fn !== "function") {
      console.error(
        `useMount: parameter \`fn\` expected to be a function, but got "${typeof fn}".`
      );
    }
  }

  useEffect(() => {
    fn?.();
  }, []);
};

export default useMount;
