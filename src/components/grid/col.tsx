import classNames from 'classnames'
import React, { useContext } from 'react'
import RowContext from './RowContext'

interface colProps {
  span?: number
}
const Col: React.FC<colProps> = (props) => {
  const {
    span,
    children
  } = props

  const { gutter } = useContext(RowContext);
  
  const _style = gutter ? {
    ...(gutter[0] ? {
      paddingLeft: gutter[0] / 2,
      paddingRight: gutter[0] / 2
    } : {}),
    ...(gutter[1] ? {
      paddingTop: gutter[1] / 2,
      paddingBottom: gutter[1] / 2
    } : {})
  } : {}

  const classes = classNames('snake-col', {
    [`snake-col-${span}`]: span
  })

  return (
    <div className={classes} style={_style} >
      {children}
    </div>
  )
}

export default Col