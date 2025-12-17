export interface User {
    id: string;
    name: string;
    email: string;
    role: 'EMPLOYEE' | 'ADMIN';
    createdAt?: string;
}

export interface LoginCredentials {
    email: string;
    password?: string;
}

export interface LoginResponseData {
    accessToken: string;
    user: User;
}

export interface AttendanceSubmission {
    photo: Blob;
}

export interface AttendanceResponse {
    id: string;
    userId: string;
    checkInTime: string;
    photoUrl: string;
    checkOutTime?: string | null;
    user: User;
}

export interface ActivityItemData {
    id: string;
    type: 'clock_in' | 'clock_out';
    date: string;
    time: string;
}
