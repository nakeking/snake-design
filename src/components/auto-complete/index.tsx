import React, { useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { nanoid } from "nanoid";

import { getElementStyle } from '../_util/util'
import { useUpdateLayoutEffect } from "../_util/hooks/useUpdateLayoutEffect";

import Select, { RenderSelect } from '../select'
import Input, { inputBaseProps } from '../input'

type optionItem = {label: string, value: string};

export interface AutoCompleteProps extends Omit<inputBaseProps, 'onSelect'> {
  allowClear?: boolean
  options: optionItem[]
  onSelect?: (data?: optionItem) => void
  onSearch?: (value: string) => void
  value?: string
  placeholder?: string,
  filterOption?: (inputValue: string, option:optionItem) => boolean 
  children?: React.ReactNode
}

const AutoComplete = ({ ...props }: AutoCompleteProps) => {
  let { 
    options, 
    children,
    filterOption,
    onSearch,
    onSelect,
    ...otherProps
  } = props;

  let inputRef = useRef<HTMLInputElement>(null);
  let [hidden, setHidden] = useState(true);
  let [onlyId] = useState(nanoid());
  let [inputValue, setValue] = useState('');
  let [option_data, setOptions] = useState(options || []);
  let [style, setStyle] = useState<React.CSSProperties>({});

  const AutoCompleteRef = useRef<HTMLDivElement>(null)

  useUpdateLayoutEffect(() => {
    if(filterOption) {
      let result = options?.filter(item => filterOption && filterOption(inputValue, item))
      setOptions(result);
    }
  }, [inputValue])

  useEffect(() => {
    const auto_offset_data = getElementStyle(AutoCompleteRef);
    setStyle(auto_offset_data);

  }, [AutoCompleteRef])

  useEffect(() => {
    setOptions(options)
  }, [onSearch])

  const hanbleBlur = (evt: React.FocusEvent) => {
    setHidden(true);
  };

  const hanbleFocus = (evt: React.FocusEvent) => {
    if(inputValue) {
      setHidden(false);
    }
  };

  const hanbleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);

    if(evt.target.value) {
      setHidden(false);
    }else{
      setHidden(true);
    }

    if(evt.target.value && onSearch) {
      onSearch(evt.target.value);
    }
  }

  const handleSelect = (value: string) => {
    setValue(value)
  } 

  console.log(option_data);

  return (
    <div 
      className="snake-auto-complete" 
      ref={AutoCompleteRef} >
      <div className="snake-auto-search" >
        <Input 
          value={inputValue}
          onChange={hanbleChange} 
          onBlur={hanbleBlur}
          onFocus={hanbleFocus} 
          {...otherProps} />
        {option_data && RenderSelect({
          id: onlyId,
          hidden,
          options: option_data,
          style,
          onSelect,
          handleSelect
        })}
      </div>
    </div>
  );
};

AutoComplete.displayName = 'Example';

export default AutoComplete