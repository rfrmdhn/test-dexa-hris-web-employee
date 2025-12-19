import { AxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../stores/useAuthStore';
import { api } from '@/libs/api/endpoints';
import { validateLoginForm } from '@/libs/helpers/validation';

export const useLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});

    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: (credentials: { email: string; password: string }) => api.auth.login(credentials),
        onSuccess: (data) => {
            login(data.access_token, data.user);
            navigate('/dashboard');
        },
        onError: (error: AxiosError<{ message: string }>) => {
            console.error('Login failed', error);

            const message = error?.response?.data?.message || 'Login failed. Please check your credentials.';
            setErrors({ form: message });
        }
    });

    const validate = (): boolean => {
        const result = validateLoginForm(email, password);
        setErrors(result.errors);
        return result.isValid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        if (!validate()) return;

        mutation.mutate({ email, password });
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        errors,
        isLoading: mutation.isPending,
        handleSubmit
    };
};
