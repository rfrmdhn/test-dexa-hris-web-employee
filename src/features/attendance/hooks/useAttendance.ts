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
    const [file, setFile] = useState<File | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [successImage, setSuccessImage] = useState<string | null>(null);

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
            if (file) {
                // File upload mode
                return api.attendance.checkIn({ photo: file });
            } else if (imgSrc) {
                // Webcam mode
                const blob = dataURLtoBlob(imgSrc);
                const compressedBlob = await compressImage(blob);
                return api.attendance.checkIn({ photo: compressedBlob });
            } else {
                throw new Error('No proof of work provided');
            }
        },
        onSuccess: (newRecord) => {
            // Do NOT invalidate queries immediately if we want to show the success state independently of the "todayAttendance" check logic
            // or we can invalidate but rely on local isSuccess state for the UI
            queryClient.setQueryData(['attendance', today], (oldData: AttendanceResponse[] | undefined) => {
                return oldData ? [...oldData, newRecord] : [newRecord];
            });
            // queryClient.invalidateQueries({ queryKey: ['attendance'] }); // Defer invalidation or let it happen

            setSuccessImage(imgSrc || (file ? URL.createObjectURL(file) : null));
            setIsSuccess(true);
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
            setFile(null); // Clear file if capturing from camera
            setError(null);
        }
    }, [webcamRef]);

    const retake = useCallback(() => {
        setImgSrc(null);
        setFile(null);
        setError(null);
    }, []);

    const handleFileSelect = useCallback((selectedFile: File) => {
        setFile(selectedFile);
        setImgSrc(null); // Clear camera capture if file selected
        setError(null);
    }, []);

    const resetState = useCallback(() => {
        setIsSuccess(false);
        setImgSrc(null);
        setFile(null);
        setSuccessImage(null);
        setError(null);
    }, []);

    return {
        // Webcam Refs & State
        webcamRef,
        imgSrc,
        file,
        capture,
        retake,
        handleFileSelect,

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
        isSuccess,
        successImage,
        resetState,
    };
};
