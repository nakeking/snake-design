import React, { useRef } from "react";

export const getElementStyle = (baseRef: React.RefObject<HTMLDivElement>) => {
  let width = baseRef.current?.clientWidth || 0;
  let left = baseRef.current?.getBoundingClientRect().left || 0;
  let top = baseRef.current?.getBoundingClientRect().top || 0;
  top += 38;

  return {
    width,
    left,
    top
  }
};