import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from "react-dom";
import { useUpdateLayoutEffect } from '../_util/hooks/useUpdateLayoutEffect';

import Input from '../input'
import Option, { optionItem } from './option'
import Tag from '../tag'
import { Icon } from '..'

import { nanoid } from 'nanoid';
import { getElementStyle } from '../_util/util';

type modeType = 'multiple'

interface selectProps {
  style?: React.CSSProperties
  showSearch?: boolean
  allowClear?: boolean
  disabled?: boolean
  loading?: boolean
  mode?: modeType
  filterOption?: () => void
  options?: optionItem[]
  children?: React.ReactNode
  placeholder?: string
}

const Select = (props: selectProps) => {
  const {
    style: _style,
    placeholder,
    allowClear,
    showSearch,
    loading,
    mode,
    disabled,
    options
  } = props

  const onlyId = nanoid();
  let [hidden, setHidden] = useState(true);
  let [style, setStyle] = useState<React.CSSProperties>({});
  let [option_data, setOptions] = useState<optionItem[]>(options || []);
  let [value, setValue] = useState<string[] | string>('')
  const SelectRef = useRef<HTMLDivElement>(null)

  const classes = classNames('snake-select-wrap', {
    'snake-select-focused': !hidden,
    'snake-select-multiple': mode === 'multiple',
    'snake-select-affix-wrapper-disabled': disabled
  })

  useEffect(() => {
    setOptions(options || []);
  }, [options])

  useEffect(() => {
    const select_offset_data = getElementStyle(SelectRef);
    setStyle(select_offset_data);

  }, [SelectRef])

  const handleClick = (evt: React.MouseEvent) => {
    setHidden(!hidden);
  }

  const handleBlur = (evt: React.FocusEvent) => {
    setHidden(true)
  }

  const handleSelect = (data: string) => {
    mode ? setValue([...value as string[], data]) : setValue(data)
  }

  return (
    <div 
      className={classes} 
      style={_style} 
      ref={SelectRef} 
      tabIndex={0}
      onClick={handleClick}  
      onBlur={handleBlur}>
      <div className="snake-select-selector">
        <div className="snake-select-selection-search">
          <Input style={{
            opacity: showSearch ? 1 : 0
          }} disabled={disabled} />
        </div>
        <div className="snake-select-selection-item">
          {mode ? <div className=""></div> : value}
        </div>
        {placeholder && !value ? <div className="snake-select-selection-placeholder">{placeholder}</div> : null}
        {loading ? <Icon type="loading" /> : <Icon type="down" />}
      </div>
      {options && RenderSelect({
        id: onlyId,
        hidden,
        options: option_data,
        style,
        handleSelect
      })}
    </div>
  )
}

class renderSelectProps {
  inputRef?: React.MutableRefObject<HTMLInputElement | null>
  id?: string
  options: optionItem[]
  hidden: true | false
  style?: React.CSSProperties
  onSelect?: (data?: optionItem) => void
  handleSelect?: (value: string) => void

  constructor() {
    this.options = []
    this.hidden = false
  }
}

export const RenderSelect = (props: renderSelectProps) => {
  const { 
    inputRef,
    id, 
    options, 
    hidden,
    style: _style,
    onSelect,
    handleSelect
  } = props;

  /**进入动画 */
  const [enter, setEnter] = useState<Boolean>(false);
  /**退出动画 */
  const [leave, setLeave] = useState<Boolean>(false);
  /**display none */
  const [_hidden, setHidden] = useState(hidden);

  const classes = classNames("snake-search-select", {
    "snake-select-hidden": _hidden,
    "snake-option-enter": enter,
    "snake-option-leave": leave
  });

  useUpdateLayoutEffect(() => {
    if(hidden) {
      setEnter(false);
      setLeave(true);

    }else{
      setEnter(true);
      setLeave(false);
      setHidden(false)
    }
  }, [hidden])

  /**optionRef */
  const optionRef = useRef<HTMLDivElement>(null);
  /**动画监听 */
  optionRef.current?.addEventListener('webkitAnimationEnd', function(evt){

    if(evt.target === evt.currentTarget) {
      if(enter && !leave) {
        setHidden(false)
      }
      if(leave && !enter) {
        setHidden(true)
        setLeave(false);
      }
    }
  }, false)

  /**选择事件 */
  const [select, setSelect] = useState<optionItem>()
  const handleClick = (data: optionItem) => {
    setSelect(data);
    
    onSelect && onSelect(data)
    handleSelect && handleSelect(data.value);
  }

  return ReactDOM.createPortal(
    <div 
      style={{position: 'absolute', width: '100%', left: 0, top: 0}} >
      <div>
        {options.length ? <div 
          ref={optionRef}
          className={classes} 
          style={_style} id={id} >
          {options?.map((item, index) => {
            return (
              <Option 
                key={item.label}
                active={select?.label === item.label} 
                value={item.value} 
                onSelect={() => handleClick(item)}>
                {item.value}
              </Option>
            );
          })}
        </div> : null}
      </div> 
    </div>
    ,
    document.body
  )
};

Select.Option = Option

export default Select