import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface AvatarProps {
    src: string;
    alt?: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const sizeMap = {
    sm: 'size-8',
    md: 'size-10',
    lg: 'size-12',
};

export const Avatar: React.FC<AvatarProps> = ({
    src,
    alt = 'User avatar',
    size = 'md',
    className,
}) => {
    return (
        <img
            src={src}
            alt={alt}
            loading="lazy"
            className={twMerge(clsx(
                'rounded-full ring-2 ring-white dark:ring-gray-800 shadow-sm shrink-0 object-cover',
                sizeMap[size],
                className
            ))}
        />
    );
};
