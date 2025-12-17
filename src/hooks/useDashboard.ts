import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';

export const useDashboard = () => {
    const user = useAuthStore((state) => state.user);
    const [isClockedIn, setIsClockedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Get current date info
    const now = new Date();
    const dayName = now.toLocaleDateString('en-US', { weekday: 'long' });
    const monthDay = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    const hour = now.getHours();
    const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

    const handleClockAction = async () => {
        setIsLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsClockedIn(!isClockedIn);
        setIsLoading(false);
    };

    const handleFileSelect = (file: File) => {
        console.log('Selected file:', file.name);
        // TODO: Upload file to API
    };

    return {
        user,
        isClockedIn,
        isLoading,
        dayName,
        monthDay,
        greeting,
        handleClockAction,
        handleFileSelect
    };
};
