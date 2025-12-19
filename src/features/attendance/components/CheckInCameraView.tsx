import React from 'react';
import Webcam from 'react-webcam';

interface CheckInCameraViewProps {
    webcamRef: React.RefObject<Webcam | null>;
    imgSrc: string | null;
}

export const CheckInCameraView: React.FC<CheckInCameraViewProps> = ({ webcamRef, imgSrc }) => {
    return (
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
                        height: { ideal: 768 },
                    }}
                    className="w-full h-full object-cover"
                />
            )}
        </div>
    );
};
