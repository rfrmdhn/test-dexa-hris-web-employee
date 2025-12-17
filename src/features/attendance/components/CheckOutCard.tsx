import React from 'react';
import { Button } from '@/components/atoms/Button';
import { Card } from '@/components/atoms/Card';

interface CheckOutCardProps {
    onCheckOut: () => void;
    isCheckingOut: boolean;
}

export const CheckOutCard: React.FC<CheckOutCardProps> = ({ onCheckOut, isCheckingOut }) => {
    return (
        <Card className="mt-4 p-4">
            <h3 className="text-lg font-bold mb-2 text-[#101622] dark:text-[#101622]">Actions</h3>
            <p className="text-sm text-gray-500 mb-4">You are currently clocked in. Don't forget to check out when you finish!</p>
            <Button fullWidth onClick={onCheckOut} disabled={isCheckingOut} variant="danger">
                {isCheckingOut ? 'Checking Out...' : 'Clock Out'}
            </Button>
        </Card>
    );
};
