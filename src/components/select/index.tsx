import classNames from 'classnames';
import React, { useRef, useState } from 'react'
import ReactDOM from "react-dom";
import { useUpdateLayoutEffect } from '../_util/hooks/useUpdateLayoutEffect';

import Input from '../input'
import Option, { optionItem } from './option'
import { Icon } from '..'

type modeType = 'multiple'

interface selectProps {
  style?: React.CSSProperties
  showSearch?: boolean
  allowClear?: boolean
  disabled?: boolean
  loading?: boolean
  mode?: modeType
  filterOption?: () => void
  options?: []
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

  const classes = classNames('snake-select-wrap', {
    'snake-select-multiple': mode === 'multiple',
    'snake-select-affix-wrapper-disabled': disabled
  })

  return (
    <div className={classes} style={_style}>
      <div className="snake-select-selector">
        {showSearch ? <div className="snake-select-selection-search">
          <Input />
        </div> : null}
        {placeholder ? <div className="snake-select-selection-placeholder">{placeholder}</div> : null}
        <div className="snake-select-selection-item"></div>
        {loading ? <Icon type="loading" /> : <Icon type="down" />}
      </div>
    </div>
  )
}

interface renderSelectProps {
  inputRef?: React.MutableRefObject<HTMLInputElement | null>
  id: string
  options?: optionItem[]
  hidden: true | false
  style?: React.CSSProperties
  onSelect?: (data?: optionItem) => void
  handleSelect?: (value: string) => void
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
        <div 
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
        </div>
      </div>
    </div>
    ,
    document.body
  )
};

Select.Option = Option

export default Select