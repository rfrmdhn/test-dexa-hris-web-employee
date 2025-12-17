import React from 'react';
import clsx from 'clsx';

interface BadgeProps {
    variant?: 'neutral' | 'success' | 'warning' | 'danger';
    children: React.ReactNode;
    className?: string;
}

const variantStyles = {
    neutral: 'bg-gray-100 dark:bg-[#2a3441] text-[#616f89] dark:text-gray-300',
    success: 'bg-green-50 dark:bg-green-900/20 text-green-600',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600',
    danger: 'bg-red-50 dark:bg-red-900/20 text-red-600',
};

export const Badge: React.FC<BadgeProps> = ({
    variant = 'neutral',
    children,
    className,
}) => {
    return (
        <span
            className={clsx(
                'inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium',
                variantStyles[variant],
                className
            )}
        >
            {children}
        </span>
    );
};
