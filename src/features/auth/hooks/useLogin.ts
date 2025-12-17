import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { api } from '@/libs/api/endpoints';
import { validateLoginForm } from '@/libs/helpers/validation';

export const useLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
    const [isLoading, setIsLoading] = useState(false);

    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();

    const validate = (): boolean => {
        const result = validateLoginForm(email, password);
        setErrors(result.errors);
        return result.isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        if (!validate()) return;

        setIsLoading(true);

        try {
            const response = await api.auth.login({ email, password });
            login(response.access_token, response.user);
            navigate('/dashboard');
        } catch (error: unknown) {
            console.error('Login failed', error);
            const axiosError = error as { response?: { data?: { message?: string } } };
            if (axiosError.response?.data?.message) {
                setErrors({ form: axiosError.response.data.message });
            } else {
                setErrors({ form: 'Login failed. Please check your credentials.' });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        errors,
        isLoading,
        handleSubmit
    };
};
