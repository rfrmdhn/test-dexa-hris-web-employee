import React from 'react';
import { Logo } from '@/components/atoms/Logo';

interface AuthLayoutProps {
    children: React.ReactNode;

}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
    children,
}) => {
    return (
        <div className="flex flex-col flex-1 w-full h-full overflow-y-auto font-display antialiased bg-background-light dark:bg-background-dark text-body dark:text-body h-screen overflow-hidden">
            <div className="w-full flex justify-center pt-8 pb-4">
                <Logo />
            </div>

            <div className="flex flex-col justify-center flex-1 px-4 sm:px-6 lg:px-8 py-12">
                {children}
            </div>
            <div className="py-6 text-center">

            </div>
        </div>
    );
};
