import apiClient, { type ApiResponse } from './apiClient';

export interface LoginCredentials {
    email: string;
    password?: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'EMPLOYEE' | 'ADMIN';
}

export interface LoginResponseData {
    access_token: string;
    user: User;
}

export const authService = {
    login: async (credentials: LoginCredentials): Promise<LoginResponseData> => {
        const response = await apiClient.post<ApiResponse<LoginResponseData>>('/auth/login', credentials);
        return response.data.data;
    },

    register: async (data: any): Promise<User> => {
        const response = await apiClient.post<ApiResponse<User>>('/auth/register', data);
        return response.data.data;
    }
};
