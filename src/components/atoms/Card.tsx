import React from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
    return (
        <div
            className={twMerge("w-full max-w-[480px] mx-auto space-y-8", className)}
            {...props}
        >
            {children}
        </div>
    );
};
