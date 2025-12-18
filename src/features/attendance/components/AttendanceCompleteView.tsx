import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/atoms/Card';
import { Icon } from '@/components/atoms/Icon';
import { Button } from '@/components/atoms/Button';
import { TimeWorkedCard } from '../components/TimeWorkedCard';

interface AttendanceCompleteViewProps {
    checkInTime: string;
    checkOutTime: string;
}

export const AttendanceCompleteView: React.FC<AttendanceCompleteViewProps> = ({
    checkInTime,
    checkOutTime
}) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center pt-10 px-4 max-w-md mx-auto w-full gap-4">
            <Card className="w-full text-center py-8">
                <div className="text-5xl mb-4 text-green-500 flex justify-center">
                    <Icon name="check_circle" className="text-5xl" />
                </div>
                <h2 className="text-2xl font-bold mb-2">You're All Set!</h2>
                <p className="text-gray-500 mb-6">You have completed your work day.</p>

                <TimeWorkedCard
                    checkInTime={checkInTime}
                    checkOutTime={checkOutTime}
                />

                <div className="mt-6">
                    <Button onClick={() => navigate('/')} variant="outline" fullWidth>Back to Dashboard</Button>
                </div>
            </Card>
        </div>
    );
};
