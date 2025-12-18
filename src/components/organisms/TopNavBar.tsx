import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@/components/atoms/Icon';
import { Avatar } from '@/components/atoms/Avatar';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';

const navLinks: { label: string; path: string }[] = [];

export const TopNavBar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsDropdownOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-divider dark:border-primary/20 px-4 md:px-6 py-3 bg-white dark:bg-surface-dark shadow-sm">
            {/* Logo */}
            <div className="flex items-center gap-4 text-body dark:text-body">
                <div className="size-8 flex items-center justify-center text-primary">
                    <Icon name="grid_view" size="xl" />
                </div>
                <h2 className="text-body dark:text-body text-lg font-bold leading-tight tracking-[-0.015em]">
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
                                : 'text-subtle dark:text-gray-400 hover:text-primary dark:hover:text-white'
                                }`}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Right side: Notifications & Profile */}
            <div className="flex items-center gap-4">
                <div className="relative" ref={dropdownRef}>
                    <div
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <div className="hidden sm:block text-right">
                            <p className="text-sm font-bold leading-none dark:text-body">{user?.name || 'User'}</p>
                            <p className="text-xs text-subtle dark:text-gray-400 leading-none mt-1">Employee</p>
                        </div>
                        <Avatar
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqGJBYcZbICPxEqamu6WZ5l6v23ghAvH920AYW4nV3seXs9qx5Zt-wOLotJWDMU_v-9q8MT-k_YJfXXQlKjqHdx6oFpXalxpXI5mZFI_r0CZD9n2ro_rRTLfC7eqU9CV21EzTZ1oBrj6XdZ5oUkg9McTeD4FO2dcq2UOAFAFoUxYD4CrkpYnOd-4fx_oUSgYseK3AQDS1OT7TQgb8cWrlq--cdUjRmaNVWmibhpJioWzLzC7MHAuTXkuDfGFXPvAtkUzEVRGdNy1dO"
                            alt={user?.name || 'User'}
                        />
                    </div>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white dark:bg-surface-dark shadow-lg border border-divider dark:border-primary/20 py-1 z-50">
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                            >
                                <Icon name="logout" size="sm" />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};
