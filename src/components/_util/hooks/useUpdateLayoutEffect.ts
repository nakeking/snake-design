import React, {useLayoutEffect, useState} from 'react'

export function useUpdateLayoutEffect(callback: () => void, depend: any[]) {
  const [status, setStatus] = useState(false)

  useLayoutEffect(() => {
    if(status) {
      callback()
    }else{
      setStatus(true)
    }
  }, depend)
}