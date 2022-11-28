import React from 'react';
interface tagProps {
    closable?: boolean;
    color?: string;
    icon?: React.ReactNode;
    children?: React.ReactNode;
    onClose?: () => void;
}
declare const Tag: React.FC<tagProps>;
export default Tag;
