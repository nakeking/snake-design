import React from "react";
declare type inputSize = 'lg' | 'sm';
declare type typeEnum = 'text' | 'password';
export interface inputBaseProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'type'> {
    size?: inputSize;
    type?: typeEnum;
    style?: React.CSSProperties;
    onPressEnter?: React.KeyboardEvent<HTMLInputElement>;
    addonBefore?: React.ReactNode;
    addonAfter?: React.ReactNode;
    prefix?: React.ReactNode | undefined;
    suffix?: React.ReactNode;
    allowClear?: boolean;
}
declare const Input: React.FC<inputBaseProps>;
export default Input;
