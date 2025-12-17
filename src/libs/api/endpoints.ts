import apiClient, { type ApiResponse } from './client';
import type { User, LoginCredentials, LoginResponseData, AttendanceSubmission, AttendanceResponse } from '@/libs/types';

export const api = {
    auth: {
        login: async (credentials: LoginCredentials): Promise<LoginResponseData> => {
            const response = await apiClient.post<ApiResponse<LoginResponseData>>('/auth/login', credentials);
            return response.data.data;
        },
        register: async (data: Omit<User, 'id'> & { password: string }): Promise<User> => {
            const response = await apiClient.post<ApiResponse<User>>('/auth/register', data);
            return response.data.data;
        },
    },
    attendance: {
        checkIn: async (data: AttendanceSubmission): Promise<AttendanceResponse> => {
            const formData = new FormData();
            formData.append('photo', data.image, 'attendance.webp');

            const response = await apiClient.post<ApiResponse<AttendanceResponse>>('/attendance/check-in', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return response.data.data;
        },
    },
};
