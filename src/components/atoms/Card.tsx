import React from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
    return (
        <div
            className={twMerge("w-full bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-divider p-6", className)}
            {...props}
        >
            {children}
        </div>
    );
};
