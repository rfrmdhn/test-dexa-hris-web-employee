import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';

export const useAuthRedirect = (redirectTo: string = '/dashboard') => {
    const { isAuthenticated } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate(redirectTo);
        }
    }, [isAuthenticated, navigate, redirectTo]);
};
