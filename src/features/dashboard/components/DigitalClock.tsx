import React from 'react';
import { useClock } from '@/features/dashboard/hooks/useClock';

export const DigitalClock: React.FC = () => {
    const { displayHours, minutes, seconds } = useClock();

    return (
        <div className="text-4xl font-mono font-bold text-gray-800 tracking-wider">
            {String(displayHours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
    );
};
