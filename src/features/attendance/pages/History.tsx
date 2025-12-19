import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/libs/api/endpoints';
import { DashboardLayout } from '@/components/templates/DashboardLayout';
import { Card } from '@/components/atoms/Card';
import { HistoryTable } from '../components/HistoryTable';

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
                    <HistoryTable
                        entries={entries}
                        meta={meta}
                        page={page}
                        onPrevPage={handlePrevPage}
                        onNextPage={handleNextPage}
                        isLoading={isLoading}
                    />
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default History;
