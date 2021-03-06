import React, {} from 'react'
import { PresetColorTypes } from '../_util/colors'
import classNames  from 'classnames'
import { Icon } from '..'

interface tagProps {
  closable?: boolean
  color?: string
  icon?: React.ReactNode
  children?: React.ReactNode,
  onClose?: () => void
}

function isPresetColor(color?: string) {
  return (PresetColorTypes as any[]).indexOf(color) !== -1
}

const Tag: React.FC<tagProps> = (props) => {
  const {
    color,
    closable,
    children,
    onClose
  } = props;

  const classes = classNames('snake-tag', {
    [`snake-tag-${color}`]: isPresetColor(color),
    'snake-tag-color': !isPresetColor(color) && color
  })
  const style: React.CSSProperties = !isPresetColor(color) ? {
    backgroundColor: color
  } : {};

  const handleClose = (evt: React.MouseEvent) => {
    evt.stopPropagation()

    onClose && onClose()
  }

  return (
    <span className={classes} style={style}>
      {children}
      {closable ? <Icon className="snake-tag-close-icon" type="close" onClick={handleClose}></Icon> : null}
    </span>
  )
}

export default Tag