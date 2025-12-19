import React from 'react';
import { Icon } from '@/components/atoms/Icon';
import { ProofUploadCard } from './ProofUploadCard';

interface CheckInUploadViewProps {
    file: File | null;
    onFileSelect: (file: File | null) => void;
}

export const CheckInUploadView: React.FC<CheckInUploadViewProps> = ({ file, onFileSelect }) => {
    return (
        <div className="w-full relative rounded-xl overflow-hidden shadow-lg bg-black aspect-[4/3] mb-6 border-4 border-gray-200 dark:border-gray-700">
            <div className="w-full h-full bg-white dark:bg-gray-900 flex flex-col justify-center p-4">
                {file ? (
                    <div className="relative w-full h-full rounded-lg overflow-hidden group">
                        <img
                            src={URL.createObjectURL(file)}
                            alt="Upload Preview"
                            className="w-full h-full object-contain bg-gray-900"
                        />
                        <button
                            onClick={() => onFileSelect(null)}
                            className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                        >
                            <Icon name="close" size="sm" />
                        </button>
                    </div>
                ) : (
                    <ProofUploadCard onFileSelect={(f) => onFileSelect(f)} />
                )}
            </div>
        </div>
    );
};
