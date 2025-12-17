// ============================================
// Shared TypeScript Types (DRY Principle)
// ============================================

// User & Auth Types
export interface User {
    id: string;
    name: string;
    email: string;
    role: 'EMPLOYEE' | 'ADMIN';
}

export interface LoginCredentials {
    email: string;
    password?: string;
}

export interface LoginResponseData {
    access_token: string;
    user: User;
}

// Attendance Types
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

// Activity Types
export interface ActivityItemData {
    id: string;
    type: 'clock_in' | 'clock_out';
    date: string;
    time: string;
}
