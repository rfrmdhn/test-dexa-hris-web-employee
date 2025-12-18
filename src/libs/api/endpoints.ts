import { authClient, attendanceClient, type ApiResponse } from './client';
import type { User, LoginCredentials, LoginResponseData, AttendanceSubmission, AttendanceResponse, AttendanceStatusResponse } from '@/libs/types';

export const api = {
    auth: {
        login: async (credentials: LoginCredentials): Promise<LoginResponseData> => {
            const response = await authClient.post<ApiResponse<LoginResponseData>>('/auth/login', credentials);
            return response.data.data;
        },
        register: async (data: Omit<User, 'id'> & { password: string }): Promise<User> => {
            const response = await authClient.post<ApiResponse<User>>('/auth/register', data);
            return response.data.data;
        },
    },
    attendance: {
        getStatus: async (): Promise<AttendanceStatusResponse> => {
            const response = await attendanceClient.get<ApiResponse<AttendanceStatusResponse>>('/attendance/status');
            return response.data.data;
        },
        checkIn: async (data: AttendanceSubmission): Promise<AttendanceResponse> => {
            const formData = new FormData();
            formData.append('photo', data.photo, 'attendance.webp');

            const response = await attendanceClient.post<ApiResponse<AttendanceResponse>>('/attendance/check-in', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return response.data.data;
        },
        checkOut: async (data: AttendanceSubmission): Promise<AttendanceResponse> => {
            const formData = new FormData();
            formData.append('photo', data.photo, 'attendance.webp');

            const response = await attendanceClient.post<ApiResponse<AttendanceResponse>>('/attendance/check-out', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return response.data.data;
        },
        getMyAttendance: async (params?: { startDate?: string; endDate?: string }): Promise<AttendanceResponse[]> => {
            const response = await attendanceClient.get<ApiResponse<AttendanceResponse[]>>('/attendance/my', { params });
            return response.data.data;
        },
    },
    employees: {
        getProfile: async (): Promise<User> => {
            const response = await authClient.get<ApiResponse<User>>('/employees/profile');
            return response.data.data;
        },
    },
};
