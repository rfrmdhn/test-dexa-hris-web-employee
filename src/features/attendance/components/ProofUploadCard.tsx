import React from 'react';
import { Icon } from '@/components/atoms/Icon';
import { useFileUpload } from '../hooks/useFileUpload';

interface ProofUploadCardProps {
    onFileSelect: (file: File) => void;
}

export const ProofUploadCard: React.FC<ProofUploadCardProps> = ({ onFileSelect }) => {
    const {
        inputRef,
        isDragging,
        preview,
        handleDrop,
        handleChange,
        handleDragOver,
        handleDragLeave,
        clearPreview
    } = useFileUpload({ onFileSelect });

    return (
        <div className="bg-white dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-[#f0f2f4] dark:border-primary/20 flex flex-col h-auto">
            <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600">
                    <Icon name="add_a_photo" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-[#101622] dark:text-[#101622]">Proof of Work</h3>
                    <p className="text-xs text-[#616f89] dark:text-gray-400">Required for remote login</p>
                </div>
            </div>

            {preview ? (
                <div className="relative rounded-lg overflow-hidden">
                    <img src={preview} alt="Proof preview" className="w-full h-40 object-cover" />
                    <button
                        onClick={clearPreview}
                        className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors"
                    >
                        <Icon name="close" size="sm" />
                    </button>
                </div>
            ) : (
                <div
                    onClick={() => inputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`flex-1 border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${isDragging
                        ? 'border-primary bg-blue-50 dark:bg-blue-900/10'
                        : 'border-[#d1d5db] dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-primary/10'
                        }`}
                >
                    <div className="size-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-primary mb-3 group-hover:scale-110 transition-transform">
                        <Icon name="cloud_upload" size="lg" />
                    </div>
                    <p className="text-sm font-medium text-[#101622] dark:text-[#101622] mb-1">
                        Click to upload or drag & drop
                    </p>
                    <p className="text-xs text-[#616f89] dark:text-gray-400">SVG, PNG, JPG (max 2MB)</p>
                </div>
            )}

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleChange}
            />
        </div>
    );
};
