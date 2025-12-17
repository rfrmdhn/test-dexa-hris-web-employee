import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@/components/atoms/Icon';
import { Avatar } from '@/components/atoms/Avatar';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';

const navLinks = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Timesheets', path: '/timesheets' },
    { label: 'Requests', path: '/requests' },
    { label: 'Profile', path: '/profile' },
];

export const TopNavBar: React.FC = () => {
    const location = useLocation();
    const user = useAuthStore((state) => state.user);

    return (
        <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-[#f0f2f4] dark:border-primary/20 px-4 md:px-6 py-3 bg-white dark:bg-surface-dark shadow-sm">
            {/* Logo */}
            <div className="flex items-center gap-4 text-[#101622] dark:text-[#101622]">
                <div className="size-8 flex items-center justify-center text-primary">
                    <Icon name="grid_view" size="xl" />
                </div>
                <h2 className="text-[#101622] dark:text-[#101622] text-lg font-bold leading-tight tracking-[-0.015em]">
                    WorkSpace
                </h2>
            </div>

            {/* Navigation - Hidden on mobile */}
            <nav className="hidden md:flex items-center gap-6">
                {navLinks.map((link) => {
                    const isActive = location.pathname === link.path;
                    return (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`text-sm font-medium leading-normal transition-colors ${isActive
                                ? 'text-primary relative after:content-[""] after:absolute after:-bottom-4 after:left-0 after:w-full after:h-0.5 after:bg-primary'
                                : 'text-[#616f89] dark:text-gray-400 hover:text-primary dark:hover:text-white'
                                }`}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Right side: Notifications & Profile */}
            <div className="flex items-center gap-4">
                <button className="p-2 text-[#616f89] dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors">
                    <Icon name="notifications" />
                </button>
                <div className="h-8 w-px bg-[#f0f2f4] dark:bg-primary/20 hidden sm:block" />
                <div className="flex items-center gap-3">
                    <div className="hidden sm:block text-right">
                        <p className="text-sm font-bold leading-none dark:text-[#101622]">{user?.name || 'User'}</p>
                        <p className="text-xs text-[#616f89] dark:text-gray-400 leading-none mt-1">Employee</p>
                    </div>
                    <Avatar
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqGJBYcZbICPxEqamu6WZ5l6v23ghAvH920AYW4nV3seXs9qx5Zt-wOLotJWDMU_v-9q8MT-k_YJfXXQlKjqHdx6oFpXalxpXI5mZFI_r0CZD9n2ro_rRTLfC7eqU9CV21EzTZ1oBrj6XdZ5oUkg9McTeD4FO2dcq2UOAFAFoUxYD4CrkpYnOd-4fx_oUSgYseK3AQDS1OT7TQgb8cWrlq--cdUjRmaNVWmibhpJioWzLzC7MHAuTXkuDfGFXPvAtkUzEVRGdNy1dO"
                        alt={user?.name || 'User'}
                    />
                </div>
            </div>
        </header>
    );
};
