import React from 'react';
import clsx from 'clsx';

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
        <div
            className={clsx(
                'bg-center bg-no-repeat bg-cover rounded-full ring-2 ring-white dark:ring-[#2a3441] shadow-sm',
                sizeMap[size],
                className
            )}
            style={{ backgroundImage: `url("${src}")` }}
            role="img"
            aria-label={alt}
        />
    );
};
