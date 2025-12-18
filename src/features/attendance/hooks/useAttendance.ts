import { useState, useRef, useCallback } from 'react';
import { AxiosError } from 'axios';
import Webcam from 'react-webcam';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/libs/api/endpoints';
import { dataURLtoBlob, compressImage } from '@/libs/helpers/image';

const preparePhotoBlob = async (file: File | null, imgSrc: string | null): Promise<Blob> => {
    let blob: Blob;

    if (file) {
        blob = file;
    } else if (imgSrc) {
        blob = dataURLtoBlob(imgSrc);
    } else {
        throw new Error('No proof of work provided');
    }

    return compressImage(blob);
};

export const useAttendance = () => {
    const queryClient = useQueryClient();
    const webcamRef = useRef<Webcam>(null);
    const [imgSrc, setImgSrc] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [successImage, setSuccessImage] = useState<string | null>(null);

    const { data: attendanceStatus, isLoading: isLoadingStatus } = useQuery({
        queryKey: ['attendance-status'],
        queryFn: () => api.attendance.getStatus(),
    });

    const currentAttendance = attendanceStatus?.currentAttendance;
    const todayAttendance = currentAttendance ? {
        checkInTime: currentAttendance.checkInTime,
        checkOutTime: currentAttendance.checkOutTime,
        isCheckedIn: attendanceStatus?.status === 'CHECKED_IN'
    } : null;

    const handleMutationSuccess = () => {
        queryClient.invalidateQueries({ queryKey: ['attendance-status'] });
        setSuccessImage(imgSrc || (file ? URL.createObjectURL(file) : null));
        setIsSuccess(true);
        setError(null);
    };

    const checkInMutation = useMutation({
        mutationFn: async () => {
            const photo = await preparePhotoBlob(file, imgSrc);
            return api.attendance.checkIn({ photo });
        },
        onSuccess: handleMutationSuccess,
        onError: (err: AxiosError<{ message: string }>) => {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to check in');
        }
    });

    const checkOutMutation = useMutation({
        mutationFn: () => api.attendance.checkOut(),
        onSuccess: handleMutationSuccess,
        onError: (err: AxiosError<{ message: string }>) => {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to check out');
        }
    });

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            setImgSrc(imageSrc);
            setFile(null);
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
        setImgSrc(null);
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
        webcamRef,
        imgSrc,
        file,
        capture,
        retake,
        handleFileSelect,
        todayAttendance,
        isLoading: isLoadingStatus,
        checkIn: checkInMutation.mutate,
        isCheckingIn: checkInMutation.isPending,
        checkOut: checkOutMutation.mutate,
        isCheckingOut: checkOutMutation.isPending,
        error: error || (checkInMutation.error as AxiosError<{ message: string }>)?.response?.data?.message || (checkOutMutation.error as AxiosError<{ message: string }>)?.response?.data?.message,
        isSuccess,
        successImage,
        resetState,
    };
};
