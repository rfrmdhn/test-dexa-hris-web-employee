import React from 'react';
import { DashboardLayout } from '@/components/templates/DashboardLayout';
import { ClockInCard } from '@/features/attendance/components/ClockInCard';
import { ProofUploadCard } from '@/features/attendance/components/ProofUploadCard';
import { RecentActivityList } from '../components/RecentActivityList';
import { TimeWorkedCard } from '@/features/attendance/components/TimeWorkedCard';
import { WeeklySummaryCard } from '@/features/attendance/components/WeeklySummaryCard';
import { Icon } from '@/components/atoms/Icon';
import { Button } from '@/components/atoms/Button';
import { useDashboard } from '../hooks/useDashboard';
import type { ActivityItemData } from '../components/ActivityItem';

// Mock data - would come from API in production
const mockActivities: ActivityItemData[] = [
    { id: '1', type: 'clock_out', date: 'Oct 21', time: '06:02 PM' },
    { id: '2', type: 'clock_in', date: 'Oct 21', time: '08:58 AM' },
    { id: '3', type: 'clock_out', date: 'Oct 20', time: '05:45 PM' },
];

const Dashboard: React.FC = () => {
    const {
        user,
        isClockedIn,
        isLoading,
        dayName,
        monthDay,
        greeting,
        handleClockAction,
        handleFileSelect
    } = useDashboard();

    return (
        <DashboardLayout>
            {/* Page Greeting */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
                <div className="flex flex-col gap-1">
                    <p className="text-[#616f89] dark:text-gray-400 text-sm font-medium uppercase tracking-wider">
                        {dayName}, {monthDay}
                    </p>
                    <h1 className="text-[#111318] dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
                        {greeting}, {user?.name?.split(' ')[0] || 'there'}
                    </h1>
                    <p className="text-[#616f89] dark:text-gray-400 text-base font-normal">
                        Ready to start your day?
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-10 px-4">
                        <Icon name="history" size="sm" className="mr-2" />
                        History
                    </Button>
                    <Button variant="outline" className="h-10 px-4">
                        <Icon name="settings" size="sm" className="mr-2" />
                        Settings
                    </Button>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* LEFT COLUMN: Main Action (2/3 width) */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <ClockInCard
                        isClockedIn={isClockedIn}
                        onClockAction={handleClockAction}
                        isLoading={isLoading}
                    />

                    {/* Timer / Stats Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TimeWorkedCard hours={0} minutes={0} seconds={0} />
                        <WeeklySummaryCard hoursWorked={38.5} targetHours={40} deltaHours={2.5} />
                    </div>
                </div>

                {/* RIGHT COLUMN: Proof & Activity (1/3 width) */}
                <div className="flex flex-col gap-6">
                    <ProofUploadCard onFileSelect={handleFileSelect} />
                    <RecentActivityList activities={mockActivities} />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;
