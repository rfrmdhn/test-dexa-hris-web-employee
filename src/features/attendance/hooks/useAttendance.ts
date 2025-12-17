import { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { AttendanceResponse } from '@/libs/types';
import { api } from '@/libs/api/endpoints';
import { format } from 'date-fns';
import { dataURLtoBlob, compressImage } from '@/libs/helpers/image';

export const useAttendance = () => {
    const queryClient = useQueryClient();
    const webcamRef = useRef<Webcam>(null);
    const [imgSrc, setImgSrc] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const today = format(new Date(), 'yyyy-MM-dd');

    // Fetch today's attendance
    const { data: attendanceHistory, isLoading: isLoadingAttendance } = useQuery({
        queryKey: ['attendance', today],
        queryFn: () => api.attendance.getMyAttendance({ startDate: today, endDate: today }),
    });

    const todayAttendance = attendanceHistory?.find((record: AttendanceResponse) => {
        const recordDate = format(new Date(record.checkInTime), 'yyyy-MM-dd');
        return recordDate === today;
    }) || null;

    const checkInMutation = useMutation({
        mutationFn: async () => {
            if (!imgSrc) throw new Error('No image captured');
            const blob = dataURLtoBlob(imgSrc);
            // Optional: Compress if needed, strict brief didn't enforce compression but it's good practice. 
            // Existing code had it, I'll keep it for UX but it's not strictly "extra features" logic-wise.
            const compressedBlob = await compressImage(blob);
            return api.attendance.checkIn({ photo: compressedBlob });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['attendance'] });
            setImgSrc(null);
            setError(null);
        },
        onError: (err: any) => {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to check in');
        }
    });

    const checkOutMutation = useMutation({
        mutationFn: () => api.attendance.checkOut(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['attendance'] });
            setError(null);
        },
        onError: (err: any) => {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to check out');
        }
    });

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            setImgSrc(imageSrc);
            setError(null);
        }
    }, [webcamRef]);

    const retake = useCallback(() => {
        setImgSrc(null);
        setError(null);
    }, []);

    return {
        // Webcam Refs & State
        webcamRef,
        imgSrc,
        capture,
        retake,

        // Data
        todayAttendance,
        isLoading: isLoadingAttendance,

        // Actions
        checkIn: checkInMutation.mutate,
        isCheckingIn: checkInMutation.isPending,
        checkOut: checkOutMutation.mutate,
        isCheckingOut: checkOutMutation.isPending,

        // Status
        error: error || (checkInMutation.error as any)?.message || (checkOutMutation.error as any)?.message,
    };
};
