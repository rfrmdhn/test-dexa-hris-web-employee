import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { useAttendance } from '../hooks/useAttendance';
import { DigitalClock } from '@/features/dashboard/components/DigitalClock';
import { Button } from '@/components/atoms/Button';
import { Card } from '@/components/atoms/Card';

const Attendance = () => {
    const { webcamRef, imgSrc, capture, retake, submit, isSubmitting, error, success } = useAttendance();
    const navigate = useNavigate();

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
                <Card>
                    <div className="text-center py-8">
                        <div className="text-5xl mb-4 text-green-500">
                            <span className="material-symbols-outlined" style={{ fontSize: '48px' }}>check_circle</span>
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Clock In Successful!</h2>
                        <p className="text-gray-500 mb-6">Your attendance has been recorded.</p>
                        <Button onClick={() => navigate('/')}>Back to Home</Button>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center pt-10 px-4 max-w-md mx-auto w-full">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Attendance Clock In</h1>

            <div className="mb-6">
                <DigitalClock />
            </div>

            <div className="w-full relative rounded-xl overflow-hidden shadow-lg bg-black aspect-[4/3] mb-6 border-4 border-gray-200 dark:border-gray-700">
                {imgSrc ? (
                    <img src={imgSrc} alt="Captured" className="w-full h-full object-cover" />
                ) : (
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={{
                            facingMode: 'user',
                            width: { ideal: 1024 },
                            height: { ideal: 768 }
                        }}
                        className="w-full h-full object-cover"
                    />
                )}
            </div>

            {error && (
                <div className="mb-4 text-red-500 bg-red-50 p-3 rounded-lg w-full text-center">
                    {error}
                </div>
            )}

            <div className="flex w-full gap-4">
                {!imgSrc ? (
                    <Button fullWidth onClick={capture}>
                        Capture Photo
                    </Button>
                ) : (
                    <>
                        <Button fullWidth variant="outline" onClick={retake} disabled={isSubmitting}>
                            Retake
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

export default Attendance;
