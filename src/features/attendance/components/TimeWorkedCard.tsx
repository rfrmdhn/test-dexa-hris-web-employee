import React, { useEffect, useState } from 'react';
import { Icon } from '@/components/atoms/Icon';
import { differenceInSeconds, parseISO } from 'date-fns';

interface TimeWorkedCardProps {
    checkInTime: string;
    checkOutTime?: string | null;
}

const TimeBox: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="flex grow basis-0 flex-col items-stretch gap-2">
        <div className="flex h-12 grow items-center justify-center rounded-lg px-2 bg-divider dark:bg-primary/20">
            <p className="text-body dark:text-body text-xl font-bold tabular-nums">
                {String(value).padStart(2, '0')}
            </p>
        </div>
        <div className="text-center">
            <p className="text-subtle dark:text-gray-400 text-xs font-medium uppercase">{label}</p>
        </div>
    </div>
);

export const TimeWorkedCard: React.FC<TimeWorkedCardProps> = ({ checkInTime, checkOutTime }) => {
    const [elapsed, setElapsed] = useState(0);

    useEffect(() => {
        const start = parseISO(checkInTime);

        const calculateElapsed = () => {
            const end = checkOutTime ? parseISO(checkOutTime) : new Date();
            const diff = differenceInSeconds(end, start);
            setElapsed(diff > 0 ? diff : 0);
        };

        calculateElapsed();

        if (!checkOutTime) {
            const interval = setInterval(calculateElapsed, 1000);
            return () => clearInterval(interval);
        }
    }, [checkInTime, checkOutTime]);

    const hours = Math.floor(elapsed / 3600);
    const minutes = Math.floor((elapsed % 3600) / 60);
    const seconds = elapsed % 60;

    return (
        <div className="bg-white dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-divider dark:border-primary/20">
            <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-primary">
                    <Icon name="timer" />
                </div>
                <h3 className="text-lg font-bold text-body dark:text-body">
                    {checkOutTime ? 'Total Worked Time' : 'Time Worked Today'}
                </h3>
            </div>
            <div className="flex gap-3">
                <TimeBox value={hours} label="Hrs" />
                <TimeBox value={minutes} label="Min" />
                <TimeBox value={seconds} label="Sec" />
            </div>
        </div>
    );
};
