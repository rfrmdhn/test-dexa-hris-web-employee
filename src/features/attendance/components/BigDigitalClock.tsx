import React from 'react';
import { useClock } from '@/features/dashboard/hooks/useClock';

export const BigDigitalClock: React.FC = () => {
    const { displayHours, minutes, seconds, ampm } = useClock();

    return (
        <h2 className="text-6xl md:text-7xl font-black text-body dark:text-body tracking-tight font-display tabular-nums">
            {String(displayHours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            <span className="text-2xl md:text-3xl text-gray-400 font-medium ml-2">{ampm}</span>
        </h2>
    );
};
