import React from "react";
export declare type optionItem = {
    label: string;
    value: string;
};
export interface OptionProps {
    active: boolean;
    value: string;
    onSelect?: (data: string) => void;
}
declare const Option: React.FC<OptionProps>;
export default Option;
