import classNames from "classnames";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Icon } from "../..";

export type optionItem = {label: string, value: string};

export interface OptionProps {
  active: boolean,
  value: string,
  onSelect?: (data: string) => void
}

const Option: React.FC<OptionProps> = (props) => {
  const {
    active,
    value,
    children,
    onSelect
  } = props;

  const classes = classNames('select-item', {
    'active': active
  })

  const handleClick = (evt: React.MouseEvent, data: string) => {
    evt.stopPropagation();

    onSelect&&onSelect(data)
  }

  return (
    <div 
      className={classes} 
      onClick={(evt) => handleClick(evt, value)}>
      {children}
      {active ? <Icon type="check"></Icon> : null}
    </div>
  )
}

export default Option