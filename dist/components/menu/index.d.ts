import { FC } from 'react';
import { IMenuProps } from './menu';
import { IMenuItemProps } from './menuItem';
import { ISubMenuProps } from './subMenu';
export declare type IMenuComponent = FC<IMenuProps> & {
    Item: FC<IMenuItemProps>;
    SubMenu: FC<ISubMenuProps>;
};
declare const TransMenu: IMenuComponent;
export default TransMenu;
