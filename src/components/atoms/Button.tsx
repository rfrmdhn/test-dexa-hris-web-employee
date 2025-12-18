import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const buttonVariants = cva(
    "flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 text-base font-bold leading-normal tracking-[0.015em] transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2",
    {
        variants: {
            variant: {
                primary: "bg-primary hover:bg-blue-700 text-white focus:ring-primary",
                secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
                ghost: "bg-transparent text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 shadow-none",
                outline: "bg-transparent border-2 border-primary text-primary hover:bg-primary/10",
                danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500"
            },
            fullWidth: {
                true: "w-full",
                false: "w-auto"
            }
        },
        defaultVariants: {
            variant: "primary",
            fullWidth: false
        }
    }
);

interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> { }

export const Button: React.FC<ButtonProps> = ({
    className,
    variant,
    fullWidth,
    children,
    ...props
}) => {
    return (
        <button
            className={twMerge(buttonVariants({ variant, fullWidth, className }))}
            {...props}
        >
            <span className="truncate">{children}</span>
        </button>
    );
};
