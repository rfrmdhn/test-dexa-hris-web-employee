import React from 'react';
import { Icon } from '@/components/atoms/Icon';
import { Badge } from '@/components/atoms/Badge';

interface WeeklySummaryCardProps {
    hoursWorked: number;
    targetHours: number;
    deltaHours?: number;
}

export const WeeklySummaryCard: React.FC<WeeklySummaryCardProps> = ({
    hoursWorked,
    targetHours,
    deltaHours,
}) => {
    const percentage = Math.min((hoursWorked / targetHours) * 100, 100);

    return (
        <div className="bg-white dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-divider dark:border-primary/20">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-600">
                        <Icon name="calendar_month" />
                    </div>
                    <h3 className="text-lg font-bold text-body dark:text-body">Weekly Total</h3>
                </div>
                {deltaHours !== undefined && deltaHours !== 0 && (
                    <Badge variant={deltaHours > 0 ? 'success' : 'danger'}>
                        {deltaHours > 0 ? '+' : ''}{deltaHours} hrs
                    </Badge>
                )}
            </div>
            <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-black text-body dark:text-body tabular-nums">
                    {hoursWorked.toFixed(1)}
                </span>
                <span className="text-subtle dark:text-gray-400 text-sm">/ {targetHours} hrs</span>
            </div>
            <div className="w-full bg-divider dark:bg-primary/20 rounded-full h-2 mt-4">
                <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
};
