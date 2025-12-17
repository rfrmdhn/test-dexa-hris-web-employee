import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';

// Global Response Structure from Contract
export interface ApiResponse<T = any> {
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

// Request Interceptor: Attach Token
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

// Response Interceptor
apiClient.interceptors.response.use(
    (response) => {
        // We can optionally unwrap the response here if we want to work directly with ApiResponse
        // For now, we return the axios response, but services will treat response.data as ApiResponse<T>
        return response;
    },
    (error: AxiosError) => {
        // Handle common errors here (e.g., 401 Unauthorized)
        if (error.response && error.response.status === 401) {
            // Optional: Helper to clear storage/redirect if needed
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // window.location.href = '/login'; // Or use a reliable way to redirect
        }
        return Promise.reject(error);
    }
);

export default apiClient;
