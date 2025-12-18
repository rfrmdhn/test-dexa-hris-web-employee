import React from 'react';
import { DashboardLayout } from '@/components/templates/DashboardLayout';
import { ClockInCard } from '@/features/attendance/components/ClockInCard';
import { ProofUploadCard } from '@/features/attendance/components/ProofUploadCard';
import { Icon } from '@/components/atoms/Icon';
import { Button } from '@/components/atoms/Button';
import { useDashboard } from '../hooks/useDashboard';


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
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
                <div className="flex flex-col gap-1">
                    <p className="text-subtle dark:text-gray-400 text-sm font-medium uppercase tracking-wider">
                        {dayName}, {monthDay}
                    </p>
                    <h1 className="text-body dark:text-body text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
                        {greeting}, {user?.name?.split(' ')[0] || 'there'}
                    </h1>
                    <p className="text-subtle dark:text-gray-400 text-base font-normal">
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <ClockInCard
                        isClockedIn={isClockedIn}
                        onClockAction={handleClockAction}
                        isLoading={isLoading}
                    />
                </div>

                <div className="flex flex-col gap-6">
                    <ProofUploadCard onFileSelect={handleFileSelect} />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;
