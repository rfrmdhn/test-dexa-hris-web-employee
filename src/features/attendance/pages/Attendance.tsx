import { useNavigate } from 'react-router-dom';
import { useAttendance } from '../hooks/useAttendance';
import { CheckInCard } from '../components/CheckInCard';
import { CheckOutCard } from '../components/CheckOutCard';
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

    // STATE: Work Done (Checked Out)
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

    // STATE: Working (Checked In, Not Checked Out)
    if (todayAttendance?.checkInTime) {
        return (
            <div className="flex flex-col items-center pt-10 px-4 max-w-md mx-auto w-full gap-4">
                <h1 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">Current Status</h1>

                <div className="w-full">
                    <TimeWorkedCard
                        checkInTime={todayAttendance.checkInTime}
                    />
                </div>

                <div className="w-full">
                    <CheckOutCard
                        onCheckOut={() => checkOut()}
                        isCheckingOut={isCheckingOut}
                    />
                    {error && (
                        <div className="mt-4 text-red-500 bg-red-50 p-3 rounded-lg w-full text-center text-sm">
                            {error}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // STATE: Not Checked In (Default)
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
