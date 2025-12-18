import { useState, useEffect } from 'react';
import { useAuthStore } from '../../auth/stores/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { api } from '@/libs/api/endpoints';
import { useQuery } from '@tanstack/react-query';

export const useDashboard = () => {
    const { user: storedUser, isAuthenticated } = useAuthStore();
    const navigate = useNavigate();
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

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

    const getGreeting = () => {
        const hour = currentTime.getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    const isClockedIn = attendanceStatus?.status === 'CHECKED_IN';
    const isOnDuty = attendanceStatus?.status === 'CHECKED_IN';

    const handleClockAction = () => {
        navigate('/attendance');
    };

    const handleFileSelect = (file: File) => {
        console.log('File selected:', file);
    };

    return {
        user: currentUser,
        isClockedIn,
        isOnDuty,
        attendanceStatus,
        isLoading: isLoadingStatus,
        dayName: format(currentTime, 'EEEE'),
        monthDay: format(currentTime, 'MMMM d'),
        greeting: getGreeting(),
        handleClockAction,
        handleFileSelect
    };
};
