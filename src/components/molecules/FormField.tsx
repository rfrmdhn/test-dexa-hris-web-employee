import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface FormFieldProps {
    label: string;
    id?: string;
    rightElement?: React.ReactNode;
    children: React.ReactNode;
    error?: string;
    className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
    label,
    id,
    rightElement,
    children,
    error,
    className
}) => {
    return (
        <div className={twMerge(clsx("flex flex-col gap-2", className))}>
            <div className="flex justify-between items-center">
                <label
                    htmlFor={id}
                    className="text-base font-medium leading-normal text-body dark:text-gray-200"
                >
                    {label}
                </label>
                {rightElement}
            </div>
            {children}
            {error && (
                <span className="text-sm text-red-500 font-medium animate-pulse">
                    {error}
                </span>
            )}
        </div>
    );
};
