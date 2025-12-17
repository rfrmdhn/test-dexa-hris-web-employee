import React, { useRef, useState } from 'react';
import { Icon } from '../atoms/Icon';

interface ProofUploadCardProps {
    onFileSelect: (file: File) => void;
}

export const ProofUploadCard: React.FC<ProofUploadCardProps> = ({ onFileSelect }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);

    const handleFile = (file: File) => {
        if (file && file.type.startsWith('image/')) {
            setPreview(URL.createObjectURL(file));
            onFileSelect(file);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        handleFile(file);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    };

    return (
        <div className="bg-white dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-[#f0f2f4] dark:border-[#2a3441] flex flex-col h-auto">
            <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600">
                    <Icon name="add_a_photo" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-[#111318] dark:text-white">Proof of Work</h3>
                    <p className="text-xs text-[#616f89] dark:text-gray-400">Required for remote login</p>
                </div>
            </div>

            {preview ? (
                <div className="relative rounded-lg overflow-hidden">
                    <img src={preview} alt="Proof preview" className="w-full h-40 object-cover" />
                    <button
                        onClick={() => setPreview(null)}
                        className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors"
                    >
                        <Icon name="close" size="sm" />
                    </button>
                </div>
            ) : (
                <div
                    onClick={() => inputRef.current?.click()}
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    className={`flex-1 border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${isDragging
                            ? 'border-primary bg-blue-50 dark:bg-blue-900/10'
                            : 'border-[#d1d5db] dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#20293a]'
                        }`}
                >
                    <div className="size-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-primary mb-3 group-hover:scale-110 transition-transform">
                        <Icon name="cloud_upload" size="lg" />
                    </div>
                    <p className="text-sm font-medium text-[#111318] dark:text-white mb-1">
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
