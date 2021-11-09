import React, { useState, useMemo, createContext } from 'react'
import classNames from 'classnames'
import { IMenuItemProps } from './menuItem'

type MenuModes = 'vertical' | 'horizontal'

/**
 * menu context 接口
 */
interface IMenuContext {
  index: string
  onSelect?: (index: string) => void
  mode: MenuModes
  defaultOpenKeys?: string[]
}

/**
 * menu props 接口
 */
export interface IMenuProps {
  defaultSelectedKeys?: string
  className?: string
  mode: MenuModes
  defaultOpenKeys?: string[]
  onSelect?: (index: string) => void
}

export const MenuContext = createContext<IMenuContext>({index: '0', mode: 'horizontal'})

const Menu: React.FC<IMenuProps> = (props) => {
  const {
    defaultSelectedKeys,
    mode,
    children,
    defaultOpenKeys,
    className: _className,
    onSelect
  } = props

  const [currentActive, setActive] = useState(defaultSelectedKeys)

  const handleClick = (index: string) => {
    setActive(index)
    if(onSelect) onSelect(index)
  }

  const contextObj: IMenuContext = useMemo(
  () => ({
    index: currentActive ? currentActive : '0',
    mode,
    onSelect: handleClick
  }), 
  [currentActive])

  const classes = classNames('snake-menu', _className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode === 'horizontal'
  })

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<IMenuItemProps>
      const { displayName } = childElement.type

      if(displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, {
          index: `${index}`
        })
      }else{
        console.error('Warning: The element is not MenuItem')
      }
    })
  }

  return (
    <ul className={classes} data-testid="menu-test">
      <MenuContext.Provider value={contextObj}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultSelectedKeys: '0',
  mode: 'horizontal'
}

export default Menu