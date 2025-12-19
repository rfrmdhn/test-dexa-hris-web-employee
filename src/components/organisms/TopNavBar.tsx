import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { Icon } from '@/components/atoms/Icon';
import { UserDropdown } from '@/components/molecules/UserDropdown';
import { useTopNavBar } from '@/hooks/useTopNavBar';
import { NAV_LINKS } from '@/constants/navLinks';

export const TopNavBar: React.FC = () => {
    const location = useLocation();
    const { user, isDropdownOpen, setIsDropdownOpen, dropdownRef, handleLogout } = useTopNavBar();

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    return (
        <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-divider dark:border-primary/20 px-4 md:px-6 py-3 bg-white dark:bg-surface-dark shadow-sm">
            <div className="flex items-center gap-4 text-body dark:text-body">
                <div className="size-8 flex items-center justify-center text-primary">
                    <Icon name="grid_view" size="xl" />
                </div>
                <h2 className="text-body dark:text-body text-lg font-bold leading-tight tracking-[-0.015em]">
                    HRIS System
                </h2>
            </div>

            <nav className="hidden md:flex items-center gap-6">
                {NAV_LINKS.map((link) => {
                    const isActive = location.pathname === link.path;
                    return (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={clsx(
                                'text-sm font-medium leading-normal transition-colors',
                                isActive
                                    ? 'text-primary relative after:content-[""] after:absolute after:-bottom-4 after:left-0 after:w-full after:h-0.5 after:bg-primary'
                                    : 'text-subtle dark:text-gray-400 hover:text-primary dark:hover:text-white'
                            )}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="flex items-center gap-4">
                <UserDropdown
                    user={user}
                    isOpen={isDropdownOpen}
                    onToggle={toggleDropdown}
                    onLogout={handleLogout}
                    dropdownRef={dropdownRef}
                />
            </div>
        </header>
    );
};
