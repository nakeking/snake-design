import React from 'react';
/**input props 接口 */
interface IconProps {
    type: string;
    className?: string;
    style?: React.CSSProperties;
    spin?: boolean;
    fill?: string;
    onClick?: React.MouseEventHandler<HTMLElement>;
}
declare const Icon: React.FC<IconProps>;
export default Icon;
