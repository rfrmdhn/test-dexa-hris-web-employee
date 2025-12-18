import { useNavigate } from 'react-router-dom';
import { useAttendance } from '../hooks/useAttendance';
import { CheckInCard } from '../components/CheckInCard';
import { SuccessDialog } from '../components/SuccessDialog';
import { AttendanceActiveView } from '../components/AttendanceActiveView';
import { AttendanceCompleteView } from '../components/AttendanceCompleteView';

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

    if (todayAttendance?.checkOutTime && todayAttendance.checkInTime) {
        return (
            <AttendanceCompleteView
                checkInTime={todayAttendance.checkInTime}
                checkOutTime={todayAttendance.checkOutTime}
            />
        );
    }

    if (todayAttendance?.checkInTime) {
        return (
            <AttendanceActiveView
                checkInTime={todayAttendance.checkInTime}
                onCheckOut={() => checkOut()}
                isCheckingOut={isCheckingOut}
                error={error}
            />
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
