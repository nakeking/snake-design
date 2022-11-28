import React from "react";
import type { CascaderProps, SelectedType } from "./cascader";
interface ImperativeHandle {
    returnRef: Function;
    ToggleBackupsData: Function;
    initDefaultValue: Function;
    clear: Function;
}
declare const SubCascader: React.ForwardRefExoticComponent<{
    menusStatus: boolean;
    _style: React.CSSProperties;
    searchValue?: string;
    onSelect: (data: SelectedType) => void;
} & Pick<CascaderProps, "showSearch"> & React.RefAttributes<ImperativeHandle>>;
export default SubCascader;
