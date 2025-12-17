import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';

export interface ApiResponse<T = unknown> {
    statusCode: number;
    message: string;
    data: T;
    success: boolean;
}

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response && error.response.status === 401) {
            console.warn('Unauthorized access detected. Logging out...', error.config?.url);
            // Use the store's logout action to ensure state is synchronized
            useAuthStore.getState().logout();
        }
        return Promise.reject(error);
    }
);

export default apiClient;
