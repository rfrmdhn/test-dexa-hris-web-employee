import React from 'react';
import { Icon } from '@/components/atoms/Icon';

interface AttendanceModeToggleProps {
    mode: 'camera' | 'upload';
    setMode: (mode: 'camera' | 'upload') => void;
    onCameraSelect?: () => void;
    onUploadSelect?: () => void;
}

export const AttendanceModeToggle: React.FC<AttendanceModeToggleProps> = ({
    mode,
    setMode,
    onCameraSelect,
    onUploadSelect
}) => {
    return (
        <div className="flex gap-2 mb-4 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <button
                onClick={() => {
                    setMode('camera');
                    onCameraSelect?.();
                }}
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
                onClick={() => {
                    setMode('upload');
                    onUploadSelect?.();
                }}
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
    );
};
