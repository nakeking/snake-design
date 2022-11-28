import React from "react";
import { inputBaseProps } from '../input';
declare type optionItem = {
    label: string;
    value: string;
};
export interface AutoCompleteProps extends Omit<inputBaseProps, 'onSelect'> {
    allowClear?: boolean;
    options?: optionItem[];
    onSelect?: (data?: string) => void;
    onSearch?: (value: string) => void;
    value?: string;
    placeholder?: string;
    filterOption?: (inputValue: string, option: optionItem) => boolean;
    children?: React.ReactNode;
}
declare const AutoComplete: {
    ({ ...props }: AutoCompleteProps): JSX.Element;
    displayName: string;
};
export default AutoComplete;
