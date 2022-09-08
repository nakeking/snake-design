/*
 * @Author:
 * @Date: 2022-04-29 11:28:26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-19 15:06:10
 * @FilePath: \beetle-ui\src\components\Cascader\SubCascader.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved.
 */
import classNames from "classnames";
import React, {
  useState,
  useMemo,
  useImperativeHandle,
  useRef,
  useContext,
} from "react";
import { createPortal } from "react-dom";
import CascaderContext from "./context";

import Icon from "../Icon";
import type { optionType, CascaderProps, SelectedType } from "./cascader";

import useUpdateEffect from "../../hooks/useUpdateEffect";

interface ImperativeHandle {
  returnRef: Function;
  ToggleBackupsData: Function;
  initDefaultValue: Function;
  clear: Function;
}

type SubCascaderPros = {
  menusStatus: boolean;
  _style: React.CSSProperties;
  searchValue?: string;
  onSelect: (data: SelectedType) => void;
} & Pick<CascaderProps, "showSearch">;

const SubCascader = React.forwardRef(
  (props: SubCascaderPros, ref: React.Ref<ImperativeHandle>) => {
    const {
      _style,
      menusStatus,
      searchValue,
      showSearch,

      onSelect,
    } = props;

    const context = useContext(CascaderContext);
    if (!context) return;
    const { options, fieldNames } = context;

    const {
      value: value_key,
      label: label_key,
      children: children_key,
    } = fieldNames;

    const menuRef = useRef(null);

    const [menus_data, setMenusData] = useState<Array<optionType>>([]);
    const [menus_search] = useState([]);

    const [menus_arr, setMenusArr] = useState<optionType[][]>([]);
    const [search_arr, setSearchArr] = useState([]);

    const [selected, setSelected] = useState<SelectedType>({
      values: [],
      labels: [],
      items: [],
      indexs: [],
    });
    const [selected_status, setSelectedStatus] = useState(false);

    const [backups_data, setBackUpsData] = useState<
      SelectedType & {
        menus_arr?: optionType[][];
      }
    >({});

    /**
     * options 初始化
     * @description:
     * @param {*}
     * @return {*}
     */
    const recursion = (
      data: Array<optionType>,
      level: number,
      parent?: optionType
    ): Array<optionType> => {
      return data.map((item: optionType, index: Number) => {
        let obj = Object.assign(
          item,
          { level },
          parent
            ? {
                values: [...parent.values, item[value_key]],
                labels: [...parent.labels, item[label_key]],
                indexs: [...parent.indexs, index],
              }
            : {
                values: [item[value_key]],
                labels: [item[label_key]],
                indexs: [index],
              }
        );

        // ================= 如果有children，递归格式化数据 =======================
        if (obj[children_key]) {
          obj.leaf = false;
          obj[children_key] = recursion(obj[children_key], level + 1, obj);
        } else {
          obj.leaf = true;

          // =============== 初始化可搜索数据 ====================================
          if (showSearch) {
            menus_search.push({
              ...obj,
              leaf: true,
              [label_key]: obj.labels.join(" / "),
              [value_key]: obj.values.join(" / "),
            });
          }
        }

        return obj;
      });
    };

    useUpdateEffect(() => {
      console.time();
      setMenusData(recursion(options, 0));
      console.timeEnd();
    }, [options]);

    useUpdateEffect(() => {
      setMenusArr([menus_data]);
    }, [menus_data]);

    useUpdateEffect(() => {
      if (typeof showSearch === "object") {
        let list = menus_search.filter((item) => {
          return showSearch.filter(searchValue, item);
        });

        setSearchArr([list]);
      } else if (searchValue) {
        let list = menus_search.filter((item) => {
          if (item[label_key].indexOf(searchValue) > -1) {
            return item;
          }
          return false;
        });

        setSearchArr([list]);
      } else {
        setSearchArr([]);
      }
    }, [searchValue]);

    useUpdateEffect(() => {
      if (selected_status) {
        onSelect && onSelect(selected);

        initBackupsData();
      }
    }, [selected]);

    useImperativeHandle(ref, () => ({
      returnRef: () => {
        return menuRef;
      },
      ToggleBackupsData: () => {
        let {
          menus_arr: backups_menus_arr,
          values: backups_values,
          labels: backups_labels,
          items: backups_items,
          indexs: backups_indexs,
        } = backups_data;

        let { items } = selected;

        if (menus_arr && backups_menus_arr) {
          if (items.length && !items[items.length - 1].leaf) {
            setSelected({
              values: backups_values,
              labels: backups_labels,
              items: backups_items,
              indexs: backups_indexs,
            });

            setMenusArr(backups_menus_arr);
          }
        }
      },
      initDefaultValue: (data): string | number[] => {
        console.log(data);

        return [];
      },
      clear: () => {
        setSelected({
          values: [],
          labels: [],
          items: [],
          indexs: [],
        });

        setMenusArr([menus_data]);

        setBackUpsData({});
      },
    }));

    /**
     * 选项选择触发事件
     * @description: Old Wang
     * @param {optionType} item
     * @return {*}
     */
    const handleSelect = (item: optionType) => {
      if (item.disabled) {
        return false;
      }

      if (searchValue) {
        handleSearchSelect(item);
      } else {
        handleBaseSelect(item);
      }
    };

    /**
     * 搜索模式 搜索选择选项
     * @description: Old Wang
     * @param {optionType} item
     * @return {*}
     */
    const handleSearchSelect = (item: optionType) => {
      // =============== 更新下拉列表数据 ==========================
      let indexs = item.indexs;
      let max = indexs.length;
      let layer = 0;
      let curr_layer_menu = menus_data;
      let result_menu = [];

      while (layer < max) {
        if (layer === 0) {
          result_menu.push(curr_layer_menu);
        } else {
          if (
            curr_layer_menu[indexs[layer - 1]][children_key] &&
            curr_layer_menu[indexs[layer - 1]][children_key].length
          ) {
            curr_layer_menu = curr_layer_menu[indexs[layer - 1]][children_key];
            result_menu.push(curr_layer_menu);
          }
        }

        layer++;
      }
      setMenusArr(result_menu);

      // ================ 更新选择项 ===============================
      let result = {
        values: item.values,
        labels: item.labels,
      };
      setSelected({
        ...selected,
        ...result,
      });

      // ================ onSelect ================================
      onSelect && onSelect(result);
    };

    /**
     * 正常选择选项
     * @description: Old Wang
     * @param {optionType} item
     * @return {*}
     */
    const handleBaseSelect = (item: optionType) => {
      if (item.leaf) {
        setMenusArr(menus_arr.slice(0, item.level + 1));
        setSelectedStatus(true);
      } else {
        let arr = menus_arr.slice(0, item.level + 1);
        arr[item.level + 1] = item[children_key];

        console.log(arr);
        setMenusArr(arr);
        setSelectedStatus(false);
      }

      let { values, labels, items } = selected;

      values = values.slice(0, item.level + 1);
      values[item.level] = item[value_key];

      labels = labels.slice(0, item.level + 1);
      labels[item.level] = item[label_key];

      items = items.slice(0, item.level + 1);
      items[item.level] = item;

      setSelected({ values, labels, items });
    };

    const handleMouseDown = (evt: React.MouseEvent) => {
      evt.preventDefault();
    };

    const initBackupsData = () => {
      let { values, labels, items } = selected;

      setBackUpsData({
        menus_arr: [...menus_arr],
        values: [...values],
        labels: [...labels],
        items: [...items],
      });
    };

    const renderCascaderMenu = useMemo(() => {
      let options = searchValue ? search_arr : menus_arr;

      return options.map((menu, i) => {
        return (
          <ul className="v-cascader-menu" key={i}>
            {menu.length ? (
              menu.map((item, index) => {
                return (
                  <li
                    key={item[value_key]}
                    className={classNames("v-cascader-menu-item", {
                      "v-cascader-menu-item-disabled": item.disabled,
                      "v-cascader-menu-item-active": selected.values?.includes(
                        item[value_key]
                      ),
                    })}
                    onClick={() => handleSelect(item)}
                    onMouseDown={(evt) => handleMouseDown(evt)}
                  >
                    <div className="v-cascader-menu-item-content">
                      {item[label_key]}
                    </div>

                    {!item.leaf ? (
                      <div className="v-cascader-menu-item-icon">
                        <Icon icon="angle-right" />
                      </div>
                    ) : null}
                  </li>
                );
              })
            ) : (
              <div className="v-cascader-null">暂无数据</div>
            )}
          </ul>
        );
      });
    }, [menus_arr, search_arr]);

    return createPortal(
      <div
        style={{
          position: "absolute",
          width: "100%",
          left: 0,
          top: 0,
        }}
        ref={menuRef}
      >
        <div>
          <div
            className={classNames("v-cascader-dropdown", {
              "v-cascader-dropdown-hidden": !menusStatus,
            })}
            style={_style}
          >
            <div className="v-cascader-menus">{renderCascaderMenu}</div>
          </div>
        </div>
      </div>,
      document.body
    );
  }
);

export default SubCascader;
