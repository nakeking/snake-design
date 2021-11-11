import React from 'react'
import classNames from "classnames";

import './_style.scss'

interface dividerProps {
  message?: string
  children?: React.ReactNode
}

const Divider: React.FC<dividerProps> = (props) => {
  const {
    message,
    children
  } = props;

  return (
    <div className="divider">
      {message ? <div className="message">{message}</div> : null}
      <div className="message-slot">
        {children}
      </div>
      <div className="link"></div>
    </div>
  )
}

export default Divider