import React from 'react';
import { ActivityItem } from './ActivityItem';
import type { ActivityItemData } from './ActivityItem';

interface RecentActivityListProps {
    activities: ActivityItemData[];
}

export const RecentActivityList: React.FC<RecentActivityListProps> = ({ activities }) => {
    return (
        <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-divider dark:border-primary/20 overflow-hidden flex-1">
            <div className="p-4 border-b border-divider dark:border-primary/20 flex justify-between items-center">
                <h3 className="text-base font-bold text-body dark:text-body">Recent Activity</h3>
                <a href="#" className="text-xs text-primary font-medium hover:underline">
                    View All
                </a>
            </div>
            <div className="divide-y divide-divider dark:divide-primary/20">
                {activities.length > 0 ? (
                    activities.map((activity) => (
                        <ActivityItem key={activity.id} activity={activity} />
                    ))
                ) : (
                    <div className="p-6 text-center text-subtle dark:text-gray-400 text-sm">
                        No recent activity
                    </div>
                )}
            </div>
        </div>
    );
};
