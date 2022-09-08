import React, { useContext } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'

export interface IMenuItemProps {
  index?: string
  disabled?: boolean
  className?: string
  style?: React.CSSProperties
}

const MenuItem: React.FC<IMenuItemProps> = (props) => {
  const {
    index,
    className: _className,
    disabled,
    children
  } = props

  const { index: _indexFromMenu, onSelect } = useContext(MenuContext)

  const handleClick = () => {
    if(onSelect && !disabled && (typeof index === 'string')) onSelect(index)
  }

  const classes = classNames('menu-item', _className, {
    'is-disabled': disabled,
    'menu-item-active': index === _indexFromMenu
  })

  return (
    <li className={classes} onClick={handleClick}>
      {children}
    </li>
  )
}

MenuItem.displayName = 'MenuItem'

export default MenuItem