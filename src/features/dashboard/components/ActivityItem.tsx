import React from 'react';
import { Icon } from '@/components/atoms/Icon';
import type { ActivityItemData } from '@/libs/types';

export type { ActivityItemData } from '@/libs/types';

interface ActivityItemProps {
    activity: ActivityItemData;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({ activity }) => {
    const isClockIn = activity.type === 'clock_in';

    return (
        <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-primary/10 transition-colors">
            <div className="flex items-center gap-3">
                <div
                    className={`size-8 rounded-full flex items-center justify-center ${isClockIn
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-primary'
                        : 'bg-red-50 dark:bg-red-900/20 text-red-600'
                        }`}
                >
                    <Icon name={isClockIn ? 'login' : 'logout'} size="sm" />
                </div>
                <div>
                    <p className="text-sm font-medium text-body dark:text-body">
                        {isClockIn ? 'Clock In' : 'Clock Out'}
                    </p>
                    <p className="text-xs text-subtle dark:text-gray-400">{activity.date}</p>
                </div>
            </div>
            <span className="text-sm font-semibold text-body dark:text-body tabular-nums">
                {activity.time}
            </span>
        </div>
    );
};
