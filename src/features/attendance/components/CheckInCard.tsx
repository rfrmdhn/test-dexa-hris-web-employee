import React from 'react';
import Webcam from 'react-webcam';
import { Button } from '@/components/atoms/Button';
import { DigitalClock } from '@/features/dashboard/components/DigitalClock';
import { AttendanceModeToggle } from './AttendanceModeToggle';
import { CheckInCameraView } from './CheckInCameraView';
import { CheckInUploadView } from './CheckInUploadView';

interface CheckInCardProps {
    webcamRef: React.RefObject<Webcam | null>;
    imgSrc: string | null;
    file: File | null;
    capture: () => void;
    retake: () => void;
    handleFileSelect: (file: File | null) => void;
    submit: () => void;
    isSubmitting: boolean;
    error?: string | null;
    actionType?: 'clock-in' | 'clock-out';
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
    actionType = 'clock-in',
}) => {
    const [mode, setMode] = React.useState<'camera' | 'upload'>('camera');
    const isClockOut = actionType === 'clock-out';

    React.useEffect(() => {
        if (!file && !imgSrc) setMode('camera');
    }, [file, imgSrc]);

    return (
        <div className="flex flex-col items-center pt-10 px-4 max-w-md mx-auto w-full">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                {isClockOut ? 'Attendance Clock Out' : 'Attendance Clock In'}
            </h1>

            <div className="mb-6">
                <DigitalClock />
            </div>

            <AttendanceModeToggle
                mode={mode}
                setMode={setMode}
                onCameraSelect={() => file && handleFileSelect(null)}
                onUploadSelect={() => imgSrc && retake()}
            />

            {mode === 'camera' ? (
                <CheckInCameraView webcamRef={webcamRef} imgSrc={imgSrc} />
            ) : (
                <CheckInUploadView
                    file={file}
                    onFileSelect={handleFileSelect}
                />
            )}

            {error && (
                <div className="mb-4 text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg w-full text-center text-sm">
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
                        <Button
                            fullWidth
                            variant="outline"
                            onClick={() => {
                                if (mode === 'camera') retake();
                                else handleFileSelect(null);
                            }}
                            disabled={isSubmitting}
                        >
                            {mode === 'camera' ? 'Retake' : 'Change File'}
                        </Button>
                        <Button
                            fullWidth
                            onClick={submit}
                            disabled={isSubmitting}
                            variant={isClockOut ? 'danger' : 'primary'}
                        >
                            {isSubmitting
                                ? 'Submitting...'
                                : isClockOut
                                    ? 'Confirm Clock Out'
                                    : 'Confirm Clock In'}
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
};
