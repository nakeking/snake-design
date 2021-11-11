import React from 'react'

export interface RowContextState {
  gutter?: [number, number]
}

const GridContext = React.createContext<RowContextState>({})

export default GridContext