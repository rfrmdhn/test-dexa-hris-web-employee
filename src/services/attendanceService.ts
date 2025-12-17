// TODO: Uncomment when switching to real API
// import apiClient from './apiClient';

export interface AttendanceSubmission {
    image: Blob;
    timestamp: string; // ISO string
    latitude?: number;
    longitude?: number;
}

export const attendanceService = {
    submitAttendance: async (data: AttendanceSubmission): Promise<void> => {
        const formData = new FormData();
        formData.append('photo', data.image, 'attendance.webp');
        formData.append('timestamp', data.timestamp);
        if (data.latitude) formData.append('latitude', data.latitude.toString());
        if (data.longitude) formData.append('longitude', data.longitude.toString());

        // In a real app:
        // await apiClient.post('/attendance/clock-in', formData, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //     },
        // });

        // Mock implementation
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Attendance submitted:', {
                    timestamp: data.timestamp,
                    size: data.image.size,
                    type: data.image.type
                });
                resolve();
            }, 1500);
        });
    },
};
