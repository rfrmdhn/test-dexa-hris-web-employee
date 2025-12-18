import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/libs/api/endpoints';
import { DashboardLayout } from '@/components/templates/DashboardLayout';
import { Card } from '@/components/atoms/Card';
import { format } from 'date-fns';
import { Button } from '@/components/atoms/Button';

const History = () => {
    const [page, setPage] = useState(1);
    const LIMIT = 10;

    const { data: attendanceHistory, isLoading } = useQuery({
        queryKey: ['attendance-history', page],
        queryFn: () => api.attendance.getMyAttendance({ page, limit: LIMIT }),
    });

    const entries = attendanceHistory?.data || [];
    const meta = attendanceHistory?.meta;

    const handlePrevPage = () => {
        if (page > 1) setPage(p => p - 1);
    };

    const handleNextPage = () => {
        if (meta && page < meta.lastPage) setPage(p => p + 1);
    };

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto py-8 px-4">
                <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Attendance History</h1>

                <Card className="overflow-hidden">
                    {isLoading ? (
                        <div className="p-8 text-center text-gray-500">Loading history...</div>
                    ) : entries.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">No attendance records found.</div>
                    ) : (
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
                    )}

                    {meta && meta.lastPage > 1 && (
                        <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                            <Button
                                variant="outline"
                                onClick={handlePrevPage}
                                disabled={page === 1}
                            >
                                Previous
                            </Button>
                            <span className="text-sm text-gray-500">
                                Page {meta.page} of {meta.lastPage}
                            </span>
                            <Button
                                variant="outline"
                                onClick={handleNextPage}
                                disabled={page === meta.lastPage}
                            >
                                Next
                            </Button>
                        </div>
                    )}
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default History;
