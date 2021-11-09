import React, { useContext, useState } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'
import { CSSTransition } from 'react-transition-group'

export interface ISubMenuProps {
  index?: string
  title: string
  className?: string
}

const SubMenu: React.FC<ISubMenuProps> = (props) => {
  const {
    index,
    title,
    className,
    children
  } = props

  const {
    index: _indexFromMenu,
    onSelect,
    mode,
    defaultOpenKeys
  } = useContext(MenuContext)

  const visible = index && mode === 'vertical' ? defaultOpenKeys?.includes(index) : false

  const [menu_visible, ToggleSubMenu] = useState(visible)

  const classes = classNames('menu-item menu-sub-item', className, {
    "menu-item-active": index === _indexFromMenu,
    'is-opened': menu_visible,
    'is-vertical': mode === "vertical"
  })

  const ClickEvents = mode === "vertical" ? {
    onClick: (e: React.MouseEvent) => {
      e.preventDefault();
      ToggleSubMenu(!menu_visible)
    }
  } : {}

  const handleHover = (e: React.MouseEvent, visible: boolean) => {
    ToggleSubMenu(visible)
  }

  const HoverEvents = mode === 'vertical' ? {
    onmouseenter: (e: React.MouseEvent) => handleHover(e, true),
    onmouseleave: (e: React.MouseEvent) => handleHover(e, false)
  } : {}

  const renderChildren = () => {
    const classes = classNames("snake-submenu", {
      "snake-submenu-open": menu_visible
    })

    const childComponent = React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<ISubMenuProps>
      const { displayName } = childElement.type

      if(displayName === "MenuItem") {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`
        })
      }else{
        console.error("Warning: The element is not MenuItem")
      }
    })

    return (
      <CSSTransition
        in={menu_visible}
        classNames="subMenuAnimation" 
        timeout={300}
        unmountOnExit
        appear>
        <ul className={classes} data-testid="sub-menu-wrapper">
          {childComponent}
        </ul>
      </CSSTransition>
      
    )
  }

  return (
    <li className={classes} {...handleHover}>
      <div className="submenu-title" {...ClickEvents}>
        <span className="submenu-title-text">{title}</span>
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = "SubMenu"

export default SubMenu