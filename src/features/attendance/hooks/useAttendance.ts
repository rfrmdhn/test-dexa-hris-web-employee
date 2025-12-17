import { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { compressImage, dataURLtoBlob } from '@/libs/helpers/image';
import { api } from '@/libs/api/endpoints';

export const useAttendance = () => {
    const webcamRef = useRef<Webcam>(null);
    const [imgSrc, setImgSrc] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

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

    const submit = async () => {
        if (!imgSrc) return;

        setIsSubmitting(true);
        setError(null);

        try {
            const blob = dataURLtoBlob(imgSrc);
            const compressedBlob = await compressImage(blob);

            // Get location (optional but recommended)
            let lat: number | undefined;
            let lng: number | undefined;

            try {
                const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
                });
                lat = position.coords.latitude;
                lng = position.coords.longitude;
            } catch (e) {
                console.warn('Geolocation failed or denied', e);
                // Proceed without location
            }

            await api.attendance.checkIn({
                image: compressedBlob,
                timestamp: new Date().toISOString(),
                latitude: lat,
                longitude: lng
            });

            setSuccess(true);
        } catch (err: unknown) {
            console.error('Submission failed', err);
            setError('Failed to submit attendance. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        webcamRef,
        imgSrc,
        capture,
        retake,
        submit,
        isSubmitting,
        error,
        success
    };
};
