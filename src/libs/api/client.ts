import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';

export interface ApiResponse<T = unknown> {
    statusCode: number;
    message: string;
    data: T;
    success: boolean;
}

const createApiClient = (baseURL: string) => {
    const client = axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    client.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            const token = localStorage.getItem('token');
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    client.interceptors.response.use(
        (response) => response,
        (error: AxiosError) => {
            if (error.response && error.response.status === 401) {
                console.warn('Unauthorized access detected. Logging out...', error.config?.url);
                useAuthStore.getState().logout();
            }
            return Promise.reject(error);
        }
    );

    return client;
};

export const authClient = createApiClient(import.meta.env.VITE_AUTH_SERVICE_URL || 'http://localhost:3001');
export const attendanceClient = createApiClient(import.meta.env.VITE_ATTENDANCE_SERVICE_URL || 'http://localhost:3002');
