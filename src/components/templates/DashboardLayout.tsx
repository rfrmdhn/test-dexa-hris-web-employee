import React from 'react';
import { TopNavBar } from '../organisms/TopNavBar';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark">
            <TopNavBar />
            <main className="w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
};
