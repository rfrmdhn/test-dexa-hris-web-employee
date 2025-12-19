import React from 'react';
import { Icon } from '@/components/atoms/Icon';
import { Avatar } from '@/components/atoms/Avatar';

interface User {
    name?: string;
    avatar?: string;
}

interface UserDropdownProps {
    user: User | null;
    isOpen: boolean;
    onToggle: () => void;
    onLogout: () => void;
    dropdownRef: React.RefObject<HTMLDivElement | null>;
}

export const UserDropdown: React.FC<UserDropdownProps> = ({
    user,
    isOpen,
    onToggle,
    onLogout,
    dropdownRef
}) => {

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle();
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <div
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                aria-haspopup="menu"
                className="flex items-center gap-3 cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg p-1"
                onClick={onToggle}
                onKeyDown={handleKeyDown}
            >
                <div className="hidden sm:block text-right">
                    <p className="text-sm font-bold leading-none dark:text-body">
                        {user?.name || 'User'}
                    </p>
                    <p className="text-xs text-subtle dark:text-gray-400 leading-none mt-1">
                        Employee
                    </p>
                </div>
                <Avatar
                    src={user?.avatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuAqGJBYcZbICPxEqamu6WZ5l6v23ghAvH920AYW4nV3seXs9qx5Zt-wOLotJWDMU_v-9q8MT-k_YJfXXQlKjqHdx6oFpXalxpXI5mZFI_r0CZD9n2ro_rRTLfC7eqU9CV21EzTZ1oBrj6XdZ5oUkg9McTeD4FO2dcq2UOAFAFoUxYD4CrkpYnOd-4fx_oUSgYseK3AQDS1OT7TQgb8cWrlq--cdUjRmaNVWmibhpJioWzLzC7MHAuTXkuDfGFXPvAtkUzEVRGdNy1dO"}
                    alt={user?.name || 'User'}
                />
            </div>

            {isOpen && (
                <div
                    role="menu"
                    id="user-menu"
                    className="absolute right-0 mt-2 w-48 rounded-lg bg-white dark:bg-surface-dark shadow-lg border border-divider dark:border-primary/20 py-1 z-50 transform origin-top-right transition-all animate-in fade-in zoom-in-95 duration-200"
                >
                    <button
                        role="menuitem"
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left outline-none focus-visible:bg-red-50 dark:focus-visible:bg-red-900/20"
                    >
                        <Icon name="logout" size="sm" />
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};
