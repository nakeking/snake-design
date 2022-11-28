import React from 'react';
declare type MenuModes = 'vertical' | 'horizontal';
/**
 * menu context 接口
 */
interface IMenuContext {
    index: string;
    onSelect?: (index: string) => void;
    mode: MenuModes;
    defaultOpenKeys?: string[];
}
/**
 * menu props 接口
 */
export interface IMenuProps {
    defaultSelectedKeys?: string;
    className?: string;
    mode: MenuModes;
    defaultOpenKeys?: string[];
    onSelect?: (index: string) => void;
}
export declare const MenuContext: React.Context<IMenuContext>;
declare const Menu: React.FC<IMenuProps>;
export default Menu;
