import React from 'react';

interface FormFieldProps {
    label: string;
    rightElement?: React.ReactNode;
    children: React.ReactNode;
    error?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
    label,
    rightElement,
    children,
    error
}) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
                <label className="text-base font-medium leading-normal text-[#111318] dark:text-gray-200">
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
