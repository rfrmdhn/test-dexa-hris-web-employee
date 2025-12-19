import React from 'react';
import { Logo } from '@/components/atoms/Logo';

interface AuthLayoutProps {
    children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
    children,
}) => {
    return (
        <div className="flex flex-col min-h-screen w-full font-display antialiased bg-background-light dark:bg-background-dark text-body dark:text-body">
            <header className="w-full flex justify-center pt-8 pb-4">
                <Logo />
            </header>

            <main className="flex flex-col justify-center flex-1 px-4 sm:px-6 lg:px-8 py-12">
                {children}
            </main>
        </div>
    );
};
