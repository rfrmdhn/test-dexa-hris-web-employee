// TODO: Uncomment when switching to real API
// import apiClient from './apiClient';

export interface LoginCredentials {
    email: string;
    password?: string; // Optional for now as per some designs, but usually required
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'EMPLOYEE' | 'ADMIN';
}

export interface LoginResponse {
    token: string;
    user: User;
}

export const authService = {
    login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
        // In a real app:
        // const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
        // return response.data;

        // Mock implementation for development
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (credentials.email.includes('error')) {
                    reject({ response: { data: { message: 'Invalid credentials' }, status: 401 } });
                } else {
                    resolve({
                        token: 'mock-jwt-token-' + Date.now(),
                        user: {
                            id: '1',
                            name: 'John Doe',
                            email: credentials.email,
                            role: 'EMPLOYEE'
                        }
                    });
                }
            }, 1000);
        });
    },
};
