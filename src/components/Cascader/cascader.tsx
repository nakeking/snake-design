/*
 * @Author:
 * @Date: 2022-04-29 11:28:26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-18 15:21:44
 * @FilePath: \beetle-ui\src\components\Cascader\cascader.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved.
 */
import classNames from "classnames";
import React, { FC, useRef, useState } from "react";
import CascaderContext from "./context";

import SubCascader from "./SubCascader";
import Icon from "../Icon";

import useMount from "../../hooks/useMount";
import useClickAway from "../../hooks/useClickAway";
import ResizeObserver from "resize-observer-polyfill";
import { fillFieldNames } from "../../util/commonUtil";

const defaultProps = {
  fieldNames: {
    label: "label",
    value: "value",
    children: "children",
  },
};

export interface fieldNamesType {
  label?: string;
  value?: string;
  children?: string;
}

export type SelectedType = Pick<optionType, "values" | "labels" | "indexs"> & {
  items?: Array<optionType>;
};

export type optionType<T = {}> = {
  level?: number;
  leaf?: boolean;
  disabled?: boolean;
  loading?: boolean;
  values?: Array<number | string>;
  labels?: Array<number | string>;
  indexs?: Array<number>;
} & T;

export interface searchType {
  filter: (inputValue: string, paths: optionType[]) => boolean;
}

export interface CascaderProps {
  laster?: boolean;
  allowClear?: boolean;
  defaultValue?: Array<string | number>;
  disabled?: boolean;
  options: Array<optionType>;
  fieldNames?: fieldNamesType;
  placeholder?: string;
  showSearch?: boolean | searchType;
  loadData?: (selectedOptions) => void;
  changeOnSelect?: boolean;

  onChange?: (value?: any, selectOptions?: any) => void;
}

const Cascader: FC<CascaderProps> = (p) => {
  const props = { ...defaultProps, ...p };
  const {
    allowClear,
    showSearch,
    options,
    fieldNames,
    defaultValue,
    disabled,
    placeholder,
    changeOnSelect,

    onChange,
  } = props;

  // =========================== Option ===========================
  const mergedOptions = React.useMemo(() => options || [], [options]);
  // ==============================================================

  // =========================== fieldNames ===========================
  const mergedFieldNames = React.useMemo(
    () => fillFieldNames(fieldNames),
    [fieldNames]
  );
  // ==============================================================

  // ================== Context ===================================
  const cascaderContext = React.useMemo(
    () => ({
      options: mergedOptions,
      fieldNames: mergedFieldNames,
      changeOnSelect,
    }),
    [mergedOptions, fieldNames, changeOnSelect]
  );
  // ==============================================================

  const [_style, setStyle] = useState<React.CSSProperties>({});
  const [content, setContent] = useState<string>("");
  const [search_str, setSearchStr] = useState<string>("");

  const [menus_status, setMenusStatus] = useState<boolean>(false);
  const [focused, setFocused] = useState<boolean>(false);

  const cascaderRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef(null);

  useClickAway(() => {
    setMenusStatus(false);
    setSearchStr("");
    setFocused(false);

    menuRef.current?.ToggleBackupsData();
  }, [cascaderRef, menuRef.current?.returnRef()]);

  useMount(() => {
    if (defaultValue) {
      initDefaultValue();
    }

    let resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const { offsetTop, offsetLeft, clientHeight } = entry.target;

        setStyle({
          left: offsetLeft,
          top: offsetTop + clientHeight + 4,
        });
      });
    });

    resizeObserver.observe(cascaderRef?.current);

    return () => {
      resizeObserver.disconnect();
    };
  });

  /**
   * 默认值 初始化
   * @description:
   * @param {*}
   * @return {*}
   */
  const initDefaultValue = () => {
    if (defaultValue.length) {
      console.log(menuRef.current?.initDefaultValue(defaultValue).join(" / "));
    }
  };

  /**
   * 自定义回显内容
   * @description:
   * @param {*} content
   * @return {*}
   */
  const formatterContent = (content) => {
    return content;
  };

  /**
   * 选择框 点击事件
   * @description:
   * @param {React} evt
   * @return {*}
   */
  const handleClick = (evt: React.MouseEvent) => {
    if (menus_status) {
      if (content) {
        setMenusStatus(!menus_status);
      }
    } else {
      setMenusStatus(!menus_status);
    }

    if (!focused) {
      setFocused(true);
    }
  };

  /**
   * 输入框查询 input事件
   * @description:
   * @param { React.ChangeEvent } evt
   * @return {*}
   */
  const handleInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearchStr(evt.target.value);
  };

  /**
   * 下拉菜单选择事件
   * @description:
   * @param {SelectedType} data
   * @return {*}
   */
  const handleSelect = (data: SelectedType) => {
    setContent(data.labels.join(" / "));
    setSearchStr("");
    setMenusStatus(false);

    let result = [];
    for (let i = 0; i < data.values.length; i++) {
      let obj = {
        [fieldNames.label]: data.labels[i],
        [fieldNames.value]: data.values[i],
      };

      result.push(obj);
    }

    onChange && onChange(data.values);
  };

  const handleClear = () => {
    setContent("");
    menuRef.current?.clear();

    setMenusStatus(false);
  };

  return (
    <CascaderContext.Provider value={cascaderContext}>
      <div
        ref={cascaderRef}
        className={classNames("v-cascader-wrap", {
          "v-cascader-clear": allowClear && content,
          "v-cascader-focused": focused,
          "v-cascader-disabled": disabled,
        })}
      >
        <div
          className={classNames("v-cascader-selector", {
            "v-cascader-selected": menus_status,
          })}
          onClick={handleClick}
        >
          <span
            className={classNames("v-cascader-search", {
              "v-cascader-customize-input": showSearch,
            })}
          >
            <input
              className={classNames("v-cascader-input", {
                "v-cascader-input-opacity": !showSearch,
              })}
              type="search"
              autoComplete="off"
              value={search_str}
              onInput={handleInput}
            />
          </span>

          {!content && !search_str ? (
            <span className="v-cascader-placeholder">{placeholder}</span>
          ) : null}

          {!search_str ? (
            <span className="v-cascader-item">{formatterContent(content)}</span>
          ) : null}
        </div>

        <span className="v-cascader-icon down">
          <Icon icon="angle-right" />
        </span>

        <span className="v-cascader-icon clear" onClick={handleClear}>
          <Icon icon="window-close" />
        </span>

        <SubCascader
          _style={_style}
          menusStatus={menus_status}
          searchValue={search_str}
          showSearch={showSearch}
          onSelect={handleSelect}
          ref={menuRef}
        />
      </div>
    </CascaderContext.Provider>
  );
};

Cascader.displayName = "Cascader";
Cascader.defaultProps = {
  allowClear: true,
  showSearch: false,
  changeOnSelect: false,
};

export default Cascader;
