import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface BadgeProps {
    variant?: 'neutral' | 'success' | 'warning' | 'danger';
    children: React.ReactNode;
    className?: string;
}

const variantStyles = {
    neutral: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300',
    success: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400',
    danger: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400',
};

export const Badge: React.FC<BadgeProps> = ({
    variant = 'neutral',
    children,
    className,
}) => {
    return (
        <span
            className={twMerge(clsx(
                'inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium',
                variantStyles[variant],
                className
            ))}
        >
            {children}
        </span>
    );
};
