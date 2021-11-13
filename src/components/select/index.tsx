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

function isSelect(value: string | string[]) {
  return value && value.length
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
  let [value, setValue] = useState<string[] | string>(mode ? [] : '')
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

  const handleSelect = (data: string | string[]) => {
    setValue(data)
  }

  const closeTag = (index: number) => {
    let base = JSON.parse(JSON.stringify(value as string[]));

    base.splice(index, 1);
    setValue(base);
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
        {showSearch ? <div className="snake-select-selection-search">
          <Input style={{
            opacity: showSearch ? 1 : 0
          }} disabled={disabled} />
        </div> : null}
        {mode ? <div className="snake-select-selection-overflow">
          {(value as string[]).map((item, index) => {
            return <div className="snake-select-selection-overflow-item" key={item}>
              <Tag closable={true} onClose={() => closeTag(index) }>{item}</Tag>
            </div>
          })}
        </div> : <div className="snake-select-selection-item">
          {value}
        </div>}
        {placeholder && !isSelect(value) ? <div className="snake-select-selection-placeholder">{placeholder}</div> : null}
        {loading ? <Icon type="loading" /> : <Icon type="down" />}
      </div>
      {options && RenderSelect({
        id: onlyId,
        hidden,
        options: option_data,
        value, 
        style,
        mode,
        handleSelect
      })}
    </div>
  )
}

class renderSelectProps {
  mode?: modeType
  inputRef?: React.MutableRefObject<HTMLInputElement | null>
  id?: string
  options: optionItem[]
  value?: string | string[]
  hidden: true | false
  style?: React.CSSProperties
  handleSelect?: (value: string | string[]) => void
  onSelect?: (data?: string) => void

  constructor() {
    this.options = []
    this.hidden = false
  }
}

export const RenderSelect = (props: renderSelectProps) => {
  const { 
    mode,
    inputRef,
    id, 
    value,
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
  const [select, setSelect] = useState<string | string[]>(value || '')
  useEffect(() => {
    setSelect(value || '')
  }, [value])

  const handleClick = (data: string, status: boolean) => {
    if(status) {
      setSelect(mode ? [...select as string[], data] : [data]);
    
      let result = mode ? [...select as string[], data].map(item => item) : data
      handleSelect && handleSelect(result);

      onSelect && onSelect(data)
    }else{
      setSelect(mode ? (select as string[]).filter(item => item !== data) : []);

      let result = mode ? (select as string[]).filter(item => item !== data).map(item => item) : ''
      handleSelect && handleSelect(result);

      onSelect && onSelect(data)
    }
    
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
            let active = mode ? (select as string[]).some(sitem => sitem == item.value) : select[0] === item.label
            return (
              <Option 
                key={item.label}
                active={active} 
                value={item.value} 
                onSelect={() => handleClick(item.value, !active)}>
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