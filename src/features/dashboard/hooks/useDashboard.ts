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
        const timer = setInterval(() => setCurrentTime(new Date()), 1000); // 1-minute update ample for greeting
        return () => clearInterval(timer);
    }, []);

    // Fetch latest profile to ensure data consistency
    const { data: profile } = useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const data = await api.employees.getProfile();
            // Optimize: Update store if data changed, or just use this data for UI
            // For now, simpler to just return data.
            return data;
        },
        enabled: isAuthenticated
    });

    // Use profile from API if available, else stored user
    const currentUser = profile || storedUser;

    const getGreeting = () => {
        const hour = currentTime.getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    const isClockedIn = false; // logic moved to Attendance module, this is just a placeholder or could be removed if unused

    const handleClockAction = () => {
        console.log('Clock action triggered');
    };

    const handleFileSelect = (file: File) => {
        console.log('File selected:', file);
    };

    return {
        user: currentUser,
        isClockedIn,
        isLoading: false,
        dayName: format(currentTime, 'EEEE'),
        monthDay: format(currentTime, 'MMMM d'),
        greeting: getGreeting(),
        handleClockAction,
        handleFileSelect
    };
};
