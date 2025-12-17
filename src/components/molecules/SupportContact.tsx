import React from 'react';
import { Icon } from '@/components/atoms/Icon';

export const SupportContact: React.FC = () => {
    return (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-[#f6f6f8] dark:bg-gray-800/50 border border-transparent dark:border-gray-700">
            <div className="bg-blue-100 dark:bg-blue-900/30 text-primary p-2 rounded-full">
                <Icon name="help" className="text-xl" />
            </div>
            <div>
                <p className="text-sm font-medium text-[#111318] dark:text-white">Having trouble?</p>
                <a href="#" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary underline">
                    Contact IT Support
                </a>
            </div>
        </div>
    );
};
