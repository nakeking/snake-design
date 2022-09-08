import React from 'react'
import classNames from 'classnames'
import omit from '../_util/omit'

/**input props 接口 */
interface IconProps {
  type: string
  className?: string
  style?: React.CSSProperties
  spin?: boolean,
  fill?: string,
  onClick?: React.MouseEventHandler<HTMLElement>
}

const Icon:React.FC<IconProps> = (props) => {
  const {
    type, 
    spin,
    style,
    fill,
    className,
    onClick,
    children
  } = props

  const classes = classNames({
    anticon: true,
    [`anticon-${type}`]: true
  }, className)

  const iconClassName = classNames({
    'anticon-spin': !!spin || type === 'loading',
  })

  const handleClick = (evt: React.MouseEvent<HTMLElement>) => {
    onClick&&onClick(evt)
  }

  return (
    <span 
      className={classes} 
      style={style} onClick={handleClick}>
      <svg 
        className={iconClassName} 
        {...omit(props, [ 'className', 'style','type', 'spin', 'children'])}>
        <use xlinkHref={`#snake-${type}`}></use>
      </svg>
    </span>
  )
}

export default Icon