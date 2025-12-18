import { useRef, useState, useCallback } from 'react';

interface UseFileUploadProps {
    onFileSelect: (file: File) => void;
}

export const useFileUpload = ({ onFileSelect }: UseFileUploadProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);

    const handleFile = useCallback((file: File) => {
        if (file && file.type.startsWith('image/')) {
            setPreview(URL.createObjectURL(file));
            onFileSelect(file);
        }
    }, [onFileSelect]);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        handleFile(file);
    }, [handleFile]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    }, [handleFile]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback(() => {
        setIsDragging(false);
    }, []);

    const clearPreview = useCallback(() => {
        setPreview(null);
    }, []);

    return {
        inputRef,
        isDragging,
        preview,
        handleDrop,
        handleChange,
        handleDragOver,
        handleDragLeave,
        clearPreview
    };
};
