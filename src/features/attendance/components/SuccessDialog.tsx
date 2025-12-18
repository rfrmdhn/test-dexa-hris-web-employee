import React from 'react';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';

interface SuccessDialogProps {
    imageUrl?: string | null;
    onConfirm: () => void;
}

export const SuccessDialog: React.FC<SuccessDialogProps> = ({ imageUrl, onConfirm }) => {
    return (
        <div className="flex flex-col items-center pt-10 px-4 max-w-md mx-auto w-full gap-4">
            <div className="w-full bg-white dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-divider dark:border-primary/20 text-center">
                <div className="flex justify-center mb-4">
                    <div className="p-3 bg-green-100 text-green-600 rounded-full">
                        <Icon name="check_circle" size="xl" />
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-body dark:text-body mb-2">
                    Clock In Successful!
                </h2>
                <p className="text-subtle dark:text-gray-400 text-sm mb-6">
                    You have successfully recorded your attendance.
                </p>

                {imageUrl && (
                    <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 mb-6 mx-auto max-w-[200px] aspect-[3/4]">
                        <img
                            src={imageUrl}
                            alt="Attendance Proof"
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                <Button fullWidth onClick={onConfirm}>
                    OK, Back to Dashboard
                </Button>
            </div>
        </div>
    );
};
