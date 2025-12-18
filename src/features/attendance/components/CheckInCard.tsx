import React from 'react';
import Webcam from 'react-webcam';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { DigitalClock } from '@/features/dashboard/components/DigitalClock';
import { ProofUploadCard } from './ProofUploadCard';

interface CheckInCardProps {
    webcamRef: React.RefObject<Webcam | null>;
    imgSrc: string | null;
    file: File | null;
    capture: () => void;
    retake: () => void;
    handleFileSelect: (file: File) => void;
    submit: () => void;
    isSubmitting: boolean;
    error: string | null;
}

export const CheckInCard: React.FC<CheckInCardProps> = ({
    webcamRef,
    imgSrc,
    file,
    capture,
    retake,
    handleFileSelect,
    submit,
    isSubmitting,
    error,
}) => {
    const [mode, setMode] = React.useState<'camera' | 'upload'>('camera');

    // Auto-switch to camera on mount or if file is removed
    React.useEffect(() => {
        if (!file && !imgSrc) setMode('camera');
    }, [file, imgSrc]);

    return (
        <div className="flex flex-col items-center pt-10 px-4 max-w-md mx-auto w-full">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Attendance Clock In</h1>

            <div className="mb-6">
                <DigitalClock />
            </div>

            <div className="flex gap-2 mb-4 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                <button
                    onClick={() => { setMode('camera'); if (file) handleFileSelect(null as any); }}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${mode === 'camera'
                        ? 'bg-white dark:bg-gray-700 text-primary shadow-sm'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                        }`}
                >
                    <div className="flex items-center gap-2">
                        <Icon name="photo_camera" size="sm" />
                        Camera
                    </div>
                </button>
                <button
                    onClick={() => { setMode('upload'); if (imgSrc) retake(); }}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${mode === 'upload'
                        ? 'bg-white dark:bg-gray-700 text-primary shadow-sm'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                        }`}
                >
                    <div className="flex items-center gap-2">
                        <Icon name="upload_file" size="sm" />
                        Upload
                    </div>
                </button>
            </div>

            <div className="w-full relative rounded-xl overflow-hidden shadow-lg bg-black aspect-[4/3] mb-6 border-4 border-gray-200 dark:border-gray-700">
                {mode === 'camera' ? (
                    imgSrc ? (
                        <img src={imgSrc} alt="Captured" className="w-full h-full object-cover" />
                    ) : (
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={{
                                facingMode: 'user',
                                width: { ideal: 1024 },
                                height: { ideal: 768 },
                            }}
                            className="w-full h-full object-cover"
                        />
                    )
                ) : (
                    // Upload Mode
                    <div className="w-full h-full bg-white dark:bg-gray-900 flex flex-col justify-center p-4">
                        {file ? (
                            <div className="relative w-full h-full rounded-lg overflow-hidden group">
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt="Upload Preview"
                                    className="w-full h-full object-contain bg-gray-900"
                                />
                                <button
                                    onClick={() => handleFileSelect(null as any)}
                                    className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                                >
                                    <Icon name="close" size="sm" />
                                </button>
                            </div>
                        ) : (
                            <ProofUploadCard onFileSelect={(f) => {
                                handleFileSelect(f);
                            }} />
                        )}
                    </div>
                )}
            </div>

            {error && (
                <div className="mb-4 text-red-500 bg-red-50 p-3 rounded-lg w-full text-center text-sm">
                    {error}
                </div>
            )}

            <div className="flex w-full gap-4">
                {mode === 'camera' && !imgSrc && (
                    <Button fullWidth onClick={capture}>
                        Capture Photo
                    </Button>
                )}

                {(imgSrc || file) && (
                    <>
                        <Button fullWidth variant="outline" onClick={() => {
                            if (mode === 'camera') retake();
                            else handleFileSelect(null as any);
                        }} disabled={isSubmitting}>
                            {mode === 'camera' ? 'Retake' : 'Change File'}
                        </Button>
                        <Button fullWidth onClick={submit} disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Confirm Clock In'}
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
};
