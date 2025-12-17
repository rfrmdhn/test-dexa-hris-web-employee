import React from 'react';
import { Button } from '@/components/atoms/Button';
import { FormField } from '@/components/molecules/FormField';
import { Input } from '@/components/atoms/Input';
import { PasswordInput } from '@/components/molecules/PasswordInput';
import { useLogin } from '../hooks/useLogin';

export const LoginForm: React.FC = () => {
    const {
        email,
        setEmail,
        password,
        setPassword,
        errors,
        isLoading,
        handleSubmit
    } = useLogin();

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {errors.form && (
                <div className="bg-red-50 text-red-500 p-3 rounded text-sm text-center font-medium border border-red-200">
                    {errors.form}
                </div>
            )}

            <FormField label="Employee ID or Email" error={errors.email}>
                <Input
                    placeholder="e.g. j.doe@company.com"
                    icon="person"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    disabled={isLoading}
                    type="email"
                />
            </FormField>

            <FormField
                label="Password"
                error={errors.password}
                rightElement={
                    <a href="#" className="text-sm font-semibold text-primary hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        Forgot Password?
                    </a>
                }
            >
                <PasswordInput
                    placeholder="Enter your password"
                    icon="lock"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    disabled={isLoading}
                />
            </FormField>

            <div className="pt-2">
                <Button fullWidth type="submit" disabled={isLoading}>
                    {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
            </div>
        </form>
    );
};
