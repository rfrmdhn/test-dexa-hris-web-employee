
export interface Meta {
    total: number;
    page: number;
    lastPage: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: Meta;
}


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


export interface AttendanceSubmission {
    photo: Blob;
}

export interface AttendanceResponse {
    id: string;
    userId?: string;
    date: string;
    checkIn: string;
    checkOut?: string | null;
    photoUrl?: string;
    status: 'PRESENT' | 'ABSENT' | 'LATE';
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

