// Common
export interface Meta {
    total: number;
    page: number;
    lastPage: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: Meta;
}

// User / Auth
export interface User {
    id: string;
    name: string;
    email: string;
    role: 'EMPLOYEE' | 'ADMIN';
    position?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface LoginCredentials {
    email: string;
    password?: string;
}

export interface LoginResponseData {
    access_token: string;
    user: User;
}

// Attendance
export interface AttendanceSubmission {
    photo: Blob;
}

export interface AttendanceResponse {
    id: string;
    userId?: string;
    date: string;
    checkIn: string; // "2024-03-20T09:00:00.000Z"
    checkOut?: string | null; // "2024-03-20T18:00:00.000Z"
    photoUrl?: string;
    status: 'PRESENT' | 'ABSENT' | 'LATE'; // Assuming status values
}

export interface CurrentAttendance {
    id: string;
    userId: string;
    checkInTime: string;
    photoUrl: string;
    checkOutTime: string | null;
    user: User;
}

export type AttendanceStatus = 'NOT_CHECKED_IN' | 'CHECKED_IN' | 'CHECKED_OUT';

export interface AttendanceStatusResponse {
    status: AttendanceStatus;
    message: string;
    currentAttendance: CurrentAttendance | null;
}

export interface ActivityItemData {
    id: string;
    type: 'clock_in' | 'clock_out';
    date: string;
    time: string;
}

