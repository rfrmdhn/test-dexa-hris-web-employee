import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    icon?: string;
    hasRightElement?: boolean;
    error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
    className,
    icon,
    hasRightElement,
    error,
    ...rest
}, ref) => {
    return (
        <div className="relative w-full">
            <input
                ref={ref}
                className={twMerge(
                    clsx(
                        "flex w-full resize-none overflow-hidden rounded-lg border bg-white p-[15px] text-base font-normal leading-normal transition-colors outline-none",
                        "text-body placeholder:text-subtle",
                        "dark:bg-surface-dark dark:text-body dark:border-gray-700 dark:placeholder:text-gray-500",
                        "focus:border-primary focus:ring-1 focus:ring-primary",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        error
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : "border-field dark:border-gray-700",
                        icon ? "pl-12" : "",
                        hasRightElement ? "pr-12" : "",
                        className
                    )
                )}
                {...rest}
            />
            {icon && (
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 dark:text-gray-500">
                    <span className="material-symbols-outlined select-none">{icon}</span>
                </div>
            )}
        </div>
    );
});

Input.displayName = 'Input';
