import { useEffect } from 'react';
import { useAuthStore } from '../../auth/stores/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { api } from '@/libs/api/endpoints';
import { useQuery } from '@tanstack/react-query';

export const useDashboard = () => {
    const storedUser = useAuthStore((state) => state.user);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    // Removed setInterval logic to prevent re-renders


    const { data: profile } = useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const data = await api.employees.getProfile();
            return data;
        },
        enabled: isAuthenticated
    });

    const { data: attendanceStatus, isLoading: isLoadingStatus } = useQuery({
        queryKey: ['attendance-status'],
        queryFn: () => api.attendance.getStatus(),
        enabled: isAuthenticated
    });

    const currentUser = profile || storedUser;


    // Removed getGreeting logic - move to component or useCurrentTime


    const isClockedIn = attendanceStatus?.status === 'CHECKED_IN';
    const isOnDuty = attendanceStatus?.status === 'CHECKED_IN';

    const handleClockAction = () => {
        navigate('/attendance');
    };

    const handleFileSelect = (_file: File) => {
        // Handle file selection logic if needed
    };
    return {
        user: currentUser,
        isClockedIn,
        isOnDuty,
        attendanceStatus,
        isLoading: isLoadingStatus,
        handleClockAction,
        handleFileSelect
    };
};
