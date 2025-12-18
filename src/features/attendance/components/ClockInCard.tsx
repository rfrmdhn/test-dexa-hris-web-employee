import React from 'react';
import { Icon } from '@/components/atoms/Icon';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { useClock } from '@/features/dashboard/hooks/useClock';

interface ClockInCardProps {
    isClockedIn: boolean;
    onClockAction: () => void;
    isLoading?: boolean;
}

export const ClockInCard: React.FC<ClockInCardProps> = ({
    isClockedIn,
    onClockAction,
    isLoading = false,
}) => {
    const { displayHours, minutes, seconds, ampm } = useClock();

    return (
        <div className="bg-white dark:bg-surface-dark rounded-xl p-6 md:p-10 shadow-sm border border-divider dark:border-primary/20 flex flex-col items-center justify-center text-center relative overflow-hidden">
            {/* Decorative top bar */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary/60 to-primary" />

            {/* Status Badge */}
            <div className="mb-6">
                <Badge variant={isClockedIn ? 'success' : 'neutral'}>
                    <span className={`w-2 h-2 rounded-full ${isClockedIn ? 'bg-green-500' : 'bg-gray-400'}`} />
                    Currently: {isClockedIn ? 'On Duty' : 'Off Duty'}
                </Badge>
            </div>

            {/* Time Display */}
            <div className="mb-8">
                <h2 className="text-6xl md:text-7xl font-black text-body dark:text-body tracking-tight font-display tabular-nums">
                    {String(displayHours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                    <span className="text-2xl md:text-3xl text-gray-400 font-medium ml-2">{ampm}</span>
                </h2>
            </div>

            {/* Clock Action Button */}
            <Button
                onClick={onClockAction}
                disabled={isLoading}
                variant={isClockedIn ? 'danger' : 'primary'}
                className="w-full max-w-[280px] h-16 text-lg"
            >
                <Icon name={isClockedIn ? 'logout' : 'login'} className="mr-3" />
                {isLoading ? 'Processing...' : isClockedIn ? 'Clock Out' : 'Clock In'}
            </Button>

            <p className="mt-4 text-subtle dark:text-gray-400 text-sm">
                {isClockedIn ? 'Remember to clock out before leaving.' : "Don't forget to upload your WFH proof below."}
            </p>
        </div>
    );
};
