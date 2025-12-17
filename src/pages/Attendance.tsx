import { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { dataURLtoBlob } from '../utils/imageHelper';

const Attendance = () => {
    const webcamRef = useRef<Webcam>(null);
    const [imgSrc, setImgSrc] = useState<string | null>(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            setImgSrc(imageSrc);
            const blob = dataURLtoBlob(imageSrc);
            console.log('Captured blob:', blob);
            // TODO: Upload blob to API
        }
    }, [webcamRef]);

    return (
        <div className="flex flex-col items-center pt-10">
            <h1 className="text-2xl font-bold mb-4">Attendance Clock In</h1>
            <div className="border-4 border-gray-300 rounded-lg overflow-hidden">
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={400}
                    height={300}
                />
            </div>
            <button
                onClick={capture}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
                Clock In
            </button>
            {imgSrc && (
                <div className="mt-4">
                    <p className="font-semibold text-center">Preview:</p>
                    <img src={imgSrc} alt="captured" className="border rounded shadow-sm" />
                </div>
            )}
        </div>
    );
};

export default Attendance;
