import React from 'react'
import classNames from 'classnames'
import RowContext from './RowContext'

interface rowProps {
  gutter?: number | [number, number]
}

const Row: React.FC<rowProps> = (props) => {
  let {
    gutter,
    children
  } = props

  gutter = Array.isArray(gutter) ? gutter : [gutter || 0, 0]

  const classes = classNames('snake-row', {
    'snake-row-gutter': gutter && gutter[1] > 0
  })

  const rowStyle = {
    ...(gutter[0] ? {
      marginLeft: gutter[0] / -2,
      marginRight: gutter[0] / -2
    } : {}),
    ...(gutter[1] ? {
      marginTop: gutter[1] / -2,
      marginBottom: gutter[1] / -2
    } : {})
  }

  return (
    <RowContext.Provider value={{ gutter }}>
      <div className={classes} style={rowStyle}>
        {children}
      </div>
    </RowContext.Provider>
  )
}

export default Row