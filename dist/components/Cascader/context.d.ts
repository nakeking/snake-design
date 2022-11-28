import * as React from "react";
import type { CascaderProps, fieldNamesType } from "./cascader";
export interface CascaderContextProps {
    options: CascaderProps["options"];
    fieldNames: fieldNamesType;
    changeOnSelect?: boolean;
}
declare const CascaderContext: React.Context<CascaderContextProps>;
export default CascaderContext;
