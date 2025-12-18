import { create } from 'zustand';
import type { User } from '@/libs/types';

interface AuthState {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
    login: (token: string, user: User) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: localStorage.getItem('token'),
    user: null, // Don't persist user PII in localStorage, fetch on boot
    isAuthenticated: !!localStorage.getItem('token'),

    login: (token, user) => {
        localStorage.setItem('token', token);
        // Do not store user in localStorage
        set({ token, user, isAuthenticated: true });
    },

    logout: () => {
        localStorage.removeItem('token');
        // localStorage.removeItem('user'); // No need to remove if we don't store it
        set({ token: null, user: null, isAuthenticated: false });
    },
}));
