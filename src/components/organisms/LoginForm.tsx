import React, { useState } from 'react';
import { Button } from '../atoms/Button';
import { FormField } from '../molecules/FormField';
import { Input } from '../atoms/Input';
import { PasswordInput } from '../molecules/PasswordInput';
import { useAuthStore } from '../../store/useAuthStore';
import { authService } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

export const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
    const [isLoading, setIsLoading] = useState(false);

    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();

    const validate = () => {
        const newErrors: { email?: string; password?: string } = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        if (!validate()) return;

        setIsLoading(true);

        try {
            const response = await authService.login({ email, password });
            login(response.token, response.user);
            navigate('/dashboard');
        } catch (error: any) {
            console.error('Login failed', error);
            // Handle backend errors (assuming standard error format)
            if (error.response?.data?.message) {
                setErrors({ form: error.response.data.message });
            } else {
                setErrors({ form: 'Login failed. Please check your credentials.' });
            }
        } finally {
            setIsLoading(false);
        }
    };

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
                    onChange={(e) => setEmail(e.target.value)}
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
                    onChange={(e) => setPassword(e.target.value)}
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
