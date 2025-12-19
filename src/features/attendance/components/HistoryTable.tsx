import React from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/atoms/Button';
import type { AttendanceResponse, Meta } from '@/libs/types';

interface HistoryTableProps {
    entries: AttendanceResponse[];
    meta?: Meta;
    page: number;
    onPrevPage: () => void;
    onNextPage: () => void;
    isLoading: boolean;
}

export const HistoryTable: React.FC<HistoryTableProps> = ({
    entries,
    meta,
    page,
    onPrevPage,
    onNextPage,
    isLoading,
}) => {
    if (isLoading) {
        return <div className="p-8 text-center text-gray-500">Loading history...</div>;
    }

    if (entries.length === 0) {
        return <div className="p-8 text-center text-gray-500">No attendance records found.</div>;
    }

    return (
        <>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
                    <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs uppercase font-semibold text-gray-500 dark:text-gray-400">
                        <tr>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Check In</th>
                            <th className="px-6 py-4">Check Out</th>
                            <th className="px-6 py-4">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                        {entries.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                    {format(new Date(item.date), 'MMM d, yyyy')}
                                </td>
                                <td className="px-6 py-4">
                                    {format(new Date(item.checkIn), 'HH:mm')}
                                </td>
                                <td className="px-6 py-4">
                                    {item.checkOut ? format(new Date(item.checkOut), 'HH:mm') : '-'}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                        ${item.status === 'PRESENT' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                                            item.status === 'LATE' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                                'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
                                        {item.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {meta && meta.lastPage > 1 && (
                <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                    <Button
                        variant="outline"
                        onClick={onPrevPage}
                        disabled={page === 1}
                    >
                        Previous
                    </Button>
                    <span className="text-sm text-gray-500">
                        Page {meta.page} of {meta.lastPage}
                    </span>
                    <Button
                        variant="outline"
                        onClick={onNextPage}
                        disabled={page === meta.lastPage}
                    >
                        Next
                    </Button>
                </div>
            )}
        </>
    );
};
