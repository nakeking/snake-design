import * as React from "react";

import type { CascaderProps, fieldNamesType } from "./cascader";

export interface CascaderContextProps {
  options: CascaderProps["options"];
  fieldNames: fieldNamesType;
  changeOnSelect?: boolean;
}

const CascaderContext = React.createContext<CascaderContextProps>(null);

export default CascaderContext;
