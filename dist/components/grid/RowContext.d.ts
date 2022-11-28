import React from 'react';
export interface RowContextState {
    gutter?: [number, number];
}
declare const GridContext: React.Context<RowContextState>;
export default GridContext;
