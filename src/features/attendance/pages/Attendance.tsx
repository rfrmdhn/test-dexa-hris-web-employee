import { useNavigate } from 'react-router-dom';
import { useAttendance } from '../hooks/useAttendance';
import { CheckInCard } from '../components/CheckInCard';
import { TimeWorkedCard } from '../components/TimeWorkedCard';
import { SuccessDialog } from '../components/SuccessDialog';
import { Button } from '@/components/atoms/Button';
import { Card } from '@/components/atoms/Card';
import { Icon } from '@/components/atoms/Icon';

const Attendance = () => {
    const {
        webcamRef,
        imgSrc,
        file,
        capture,
        retake,
        handleFileSelect,
        checkIn,
        isCheckingIn,
        checkOut,
        isCheckingOut,
        todayAttendance,
        isLoading,
        error,
        isSuccess,
        successImage
    } = useAttendance();

    const navigate = useNavigate();

    if (isLoading) {
        return <div className="p-4 text-center">Loading attendance status...</div>;
    }

    if (isSuccess) {
        return (
            <SuccessDialog
                imageUrl={successImage}
                onConfirm={() => navigate('/', { replace: true })}
            />
        );
    }

    if (todayAttendance?.checkOutTime) {
        return (
            <div className="flex flex-col items-center pt-10 px-4 max-w-md mx-auto w-full gap-4">
                <Card className="w-full text-center py-8">
                    <div className="text-5xl mb-4 text-green-500 flex justify-center">
                        <Icon name="check_circle" className="text-5xl" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">You're All Set!</h2>
                    <p className="text-gray-500 mb-6">You have completed your work day.</p>

                    <TimeWorkedCard
                        checkInTime={todayAttendance.checkInTime}
                        checkOutTime={todayAttendance.checkOutTime}
                    />

                    <div className="mt-6">
                        <Button onClick={() => navigate('/')} variant="outline" fullWidth>Back to Dashboard</Button>
                    </div>
                </Card>
            </div>
        );
    }

    if (todayAttendance?.checkInTime) {
        return (
            <div className="flex flex-col items-center pt-10 px-4 max-w-md mx-auto w-full gap-4">
                <Card className="w-full text-center py-8">
                    <div className="text-5xl mb-4 text-blue-500 flex justify-center">
                        <Icon name="schedule" className="text-5xl" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">You're Clocked In</h2>
                    <p className="text-gray-500 mb-6">Ready to end your day?</p>

                    <TimeWorkedCard
                        checkInTime={todayAttendance.checkInTime}
                        checkOutTime={null}
                    />

                    <div className="mt-6 flex flex-col gap-3">
                        <Button
                            onClick={() => checkOut()}
                            variant="danger"
                            fullWidth
                            disabled={isCheckingOut}
                        >
                            {isCheckingOut ? 'Clocking Out...' : 'Clock Out'}
                        </Button>
                        <Button onClick={() => navigate('/')} variant="outline" fullWidth>
                            Back to Dashboard
                        </Button>
                    </div>
                    {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
                </Card>
            </div>
        );
    }

    return (
        <CheckInCard
            webcamRef={webcamRef}
            imgSrc={imgSrc}
            file={file}
            capture={capture}
            retake={retake}
            handleFileSelect={handleFileSelect}
            submit={() => checkIn()}
            isSubmitting={isCheckingIn}
            error={error}
        />
    );
};

export default Attendance;
