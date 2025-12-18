import React from 'react';
import { format } from 'date-fns';
import { DashboardLayout } from '@/components/templates/DashboardLayout';
import { ClockInCard } from '@/features/attendance/components/ClockInCard';
import { useDashboard } from '../hooks/useDashboard';
import { useCurrentTime } from '../hooks/useCurrentTime';


const Dashboard: React.FC = () => {
    const {
        user,
        isClockedIn,
        isLoading,
        handleClockAction
    } = useDashboard();

    const currentTime = useCurrentTime();


    const dayName = format(currentTime, 'EEEE');
    const monthDay = format(currentTime, 'MMMM d');

    const getGreeting = () => {
        const hour = currentTime.getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <DashboardLayout>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
                <div className="flex flex-col gap-1">
                    <p className="text-subtle dark:text-gray-400 text-sm font-medium uppercase tracking-wider">
                        {dayName}, {monthDay}
                    </p>
                    <h1 className="text-body dark:text-body text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
                        {getGreeting()}, {user?.name?.split(' ')[0] || 'there'}
                    </h1>
                    <p className="text-subtle dark:text-gray-400 text-base font-normal">
                        {isClockedIn ? 'Ready to end your day?' : 'Ready to start your day?'}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-3 flex flex-col gap-6">
                    <ClockInCard
                        isClockedIn={isClockedIn}
                        onClockAction={handleClockAction}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;
