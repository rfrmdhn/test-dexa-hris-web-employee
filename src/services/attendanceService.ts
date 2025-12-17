import apiClient, { type ApiResponse } from './apiClient';

export interface AttendanceSubmission {
    image: Blob;
    timestamp: string; // ISO string
    latitude?: number;
    longitude?: number;
}

export interface AttendanceResponse {
    id: string;
    userId: string;
    checkInTime: string;
    photoUrl: string;
    checkOutTime?: string | null;
}

export const attendanceService = {
    submitAttendance: async (data: AttendanceSubmission): Promise<AttendanceResponse> => {
        const formData = new FormData();
        // Contract explicitly requires 'photo' as the key
        formData.append('photo', data.image, 'attendance.webp');

        // We can send these if the backend supports them, otherwise they might be ignored
        // Keeping them as they might be useful metadata if backend allows
        // formData.append('timestamp', data.timestamp);
        // if (data.latitude) formData.append('latitude', data.latitude.toString());
        // if (data.longitude) formData.append('longitude', data.longitude.toString());

        const response = await apiClient.post<ApiResponse<AttendanceResponse>>('/attendance/check-in', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data.data;
    },
};
