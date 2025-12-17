import React from 'react';
import { Logo } from '@/components/atoms/Logo';

interface AuthLayoutProps {
    children: React.ReactNode;

}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
    children,
}) => {
    return (
        <div className="flex flex-col flex-1 w-full h-full overflow-y-auto font-display antialiased bg-white dark:bg-gray-900 text-[#111318] dark:text-white h-screen overflow-hidden">
            <div className="w-full flex justify-center pt-8 pb-4">
                <Logo />
            </div>

            <div className="flex flex-col justify-center flex-1 px-4 sm:px-6 lg:px-8 py-12">
                {children}
            </div>
            <div className="py-6 text-center">
                <p className="text-sm text-gray-400 dark:text-gray-600">© 2023 WorkPortal Inc. All rights reserved.</p>
            </div>
        </div>
    );
};
