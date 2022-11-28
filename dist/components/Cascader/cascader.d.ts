import { FC } from "react";
export interface fieldNamesType {
    label?: string;
    value?: string;
    children?: string;
}
export declare type SelectedType = Pick<optionType, "values" | "labels" | "indexs"> & {
    items?: Array<optionType>;
};
export declare type optionType<T = {}> = {
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
    defaultValue?: Array<string | number> | [];
    disabled?: boolean;
    options: Array<optionType>;
    fieldNames?: fieldNamesType;
    placeholder?: string;
    showSearch?: boolean | searchType;
    loadData?: (selectedOptions: any) => void;
    changeOnSelect?: boolean;
    onChange?: (value?: any, selectOptions?: any) => void;
}
declare const Cascader: FC<CascaderProps>;
export default Cascader;
