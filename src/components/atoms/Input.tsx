import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: string;
    hasRightElement?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
    className,
    icon,
    hasRightElement,
    children,
    ...rest
}, ref) => {
    return (
        <div className="relative" >
            <input
                ref={ref}
                className={twMerge(
                    clsx(
                        "form-input flex w-full resize-none overflow-hidden rounded-lg text-[#101622] dark:text-[#101622] border border-[#dbdfe6] dark:border-gray-200 bg-white dark:bg-white focus:border-primary focus:ring-primary focus:ring-1 h-14 placeholder:text-[#616f89] dark:placeholder:text-gray-400 p-[15px] text-base font-normal leading-normal transition-colors outline-none",
                        icon ? "pl-12" : "",
                        hasRightElement ? "pr-12" : "",
                        className
                    )
                )}
                {...rest}
            />
            {icon && (
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
                    <span className="material-symbols-outlined">{icon}</span>
                </div>
            )}
        </div >
    );
});

Input.displayName = 'Input';
