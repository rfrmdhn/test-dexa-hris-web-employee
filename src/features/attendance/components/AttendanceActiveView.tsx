import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/atoms/Card';
import { Icon } from '@/components/atoms/Icon';
import { Button } from '@/components/atoms/Button';
import { TimeWorkedCard } from '../components/TimeWorkedCard';

interface AttendanceActiveViewProps {
    checkInTime: string;
    onCheckOut: () => void;
    isCheckingOut: boolean;
    error: string | null;
}

export const AttendanceActiveView: React.FC<AttendanceActiveViewProps> = ({
    checkInTime,
    onCheckOut,
    isCheckingOut,
    error
}) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center pt-10 px-4 max-w-md mx-auto w-full gap-4">
            <Card className="w-full text-center py-8">
                <div className="text-5xl mb-4 text-blue-500 flex justify-center">
                    <Icon name="schedule" className="text-5xl" />
                </div>
                <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">You're Clocked In</h2>
                <p className="text-gray-500 mb-6">Ready to end your day?</p>

                <TimeWorkedCard
                    checkInTime={checkInTime}
                    checkOutTime={null}
                />

                <div className="mt-6 flex flex-col gap-3">
                    <Button
                        onClick={onCheckOut}
                        variant="danger"
                        fullWidth
                        disabled={isCheckingOut}
                    >
                        {isCheckingOut ? 'Clocking Out...' : 'Clock Out'}
                    </Button>
                    <Button onClick={() => navigate('/')} variant="outline" fullWidth>
                        Back to Dashboard
                    </Button>
                </div>
                {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
            </Card>
        </div>
    );
};
