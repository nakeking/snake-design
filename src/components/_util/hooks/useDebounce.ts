import React, {useLayoutEffect, useState} from 'react'

export const useDebounce = (fn: Function, delay: number = 500) => {
  let timer: any;

  return function (...args: any[]) {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn(...args);
      timer = null;
    }, delay);
  };
};