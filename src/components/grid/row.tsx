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

  return (
    <RowContext.Provider value={{ gutter }}>
      <div className={classes} >
        {children}
      </div>
    </RowContext.Provider>
  )
}

export default Row