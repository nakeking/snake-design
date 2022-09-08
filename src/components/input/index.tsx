import { placeholder } from "@babel/types";
import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "..";
import { useUpdateLayoutEffect } from "../_util/hooks/useUpdateLayoutEffect";

type inputSize = 'lg' | 'sm' 
type typeEnum = 'text' | 'password'
export interface inputBaseProps 
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'type'>{
  size?: inputSize
  type?: typeEnum
  style?: React.CSSProperties
  onPressEnter?: React.KeyboardEvent<HTMLInputElement>
  addonBefore?: React.ReactNode
  addonAfter?: React.ReactNode
  prefix?: React.ReactNode | undefined
  suffix?: React.ReactNode,
  allowClear?: boolean
}

const Input: React.FC<inputBaseProps> = (props) => {
  const {
    type,
    size,
    prefix,
    suffix,
    addonBefore,
    addonAfter,
    value,
    allowClear,
    style: _style,
    ...inputProps
  } = props;

  const inputRef = useRef<HTMLInputElement>(null)
  const [_focused, setFocused] = useState<boolean>(false)
  const [_value, setValue] = useState<string | number | readonly string[] | undefined>(value)
  const [_type, setType] = useState<typeEnum | undefined>(type)
  const [passwrod_icon, setPasswordIcon] = useState<'eye' | 'eye_invisible'>('eye_invisible')

  useEffect(() => {
    setValue(value)
  }, [value])

  useUpdateLayoutEffect(() => {
    inputRef?.current?.focus()
  }, [_type])
  
  const classes = classNames('snake-input-wrapper', {
    'snake-input-focused': _focused,
    'snake-input-affix-wrapper-disabled': inputProps.disabled
  })
  const inputClassNames = classNames('snake-input', {
    'snake-input-disabled': inputProps.disabled
  })

  const handleClick = (evt: React.MouseEvent) => {
    inputRef?.current?.focus()
  }
  const hanbleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
    
    const { onChange } = inputProps;
    onChange&&onChange(evt);
  }
  const hanblleFocused = (evt: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true)

    const { onFocus } = inputProps;
    onFocus&&onFocus(evt);
  }
  const hanbleBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false)

    const { onBlur } = inputProps;
    onBlur&&onBlur(evt);
  }

  const closeValue = (evt: React.MouseEvent) => {
    evt.stopPropagation();
    
    setValue("");
  }

  const togglePassword = (evt: React.MouseEvent) => {
    evt.stopPropagation();

    setPasswordIcon(passwrod_icon == 'eye' ? 'eye_invisible' : 'eye');
    setType(passwrod_icon == 'eye' ? 'password' : 'text')
  }

  return (
    <div className={classes} onClick={handleClick}>
      {addonBefore}
      {prefix}
      <input 
        style={_style}
        ref={inputRef} 
        className={inputClassNames}
        {...inputProps}
        type={_type}
        value={fixControlledValue(_value)}
        onChange={hanbleChange} 
        onFocus={hanblleFocused}
        onBlur={hanbleBlur} />
      <span className="snake-input-suffix ">
        {type === 'password' ? <Icon type={passwrod_icon} onClick={togglePassword} /> : null}
        {allowClear ? <Icon type="close" onClick={closeValue} /> : null}
      </span>
      {suffix}
      {addonAfter}
    </div>
  )
}

function fixControlledValue<T>(value: T) {
  if (typeof value === 'undefined' || value === null) {
    return '';
  }
  return value;
}

export default Input