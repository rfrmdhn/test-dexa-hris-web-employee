import React, { useState } from 'react';
import { Input, type InputProps } from '@/components/atoms/Input';
import { Icon } from '@/components/atoms/Icon';

export const PasswordInput: React.FC<InputProps> = (props) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="relative">
            <Input
                {...props}
                type={showPassword ? 'text' : 'password'}
                hasRightElement
            />
            <button
                type="button"
                onClick={toggleVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
            >
                <Icon
                    name={showPassword ? 'visibility_off' : 'visibility'}
                    size="md"
                    className="select-none"
                />
            </button>
        </div>
    );
};
