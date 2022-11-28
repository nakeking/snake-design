import React from 'react';
import { optionItem, OptionProps } from './option';
declare type modeType = 'multiple';
interface selectProps {
    style?: React.CSSProperties;
    showSearch?: boolean;
    allowClear?: boolean;
    disabled?: boolean;
    loading?: boolean;
    mode?: modeType;
    filterOption?: () => void;
    options?: optionItem[];
    children?: React.ReactNode;
    placeholder?: string;
}
declare const Select: React.FC<selectProps> & {
    Option: React.FC<OptionProps>;
};
declare class renderSelectProps {
    mode?: modeType;
    inputRef?: React.MutableRefObject<HTMLInputElement | null>;
    id?: string;
    options: optionItem[];
    value?: string | string[];
    hidden: true | false;
    style?: React.CSSProperties;
    handleSelect?: (value: string | string[]) => void;
    onSelect?: (data?: string) => void;
    constructor();
}
export declare const RenderSelect: (props: renderSelectProps) => React.ReactPortal;
export default Select;
