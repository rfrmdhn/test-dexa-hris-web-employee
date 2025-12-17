import React from 'react';
import clsx from 'clsx';

import { twMerge } from 'tailwind-merge';

interface IconProps {
    name: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    filled?: boolean;
    className?: string;
}

const sizeMap = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
};

export const Icon: React.FC<IconProps> = ({
    name,
    size = 'md',
    filled = false,
    className,
}) => {
    return (
        <span
            className={twMerge(
                clsx(
                    'material-symbols-outlined select-none',
                    sizeMap[size],
                    className
                )
            )}
            style={{ fontVariationSettings: filled ? "'FILL' 1" : "'FILL' 0" }}
        >
            {name}
        </span>
    );
};
