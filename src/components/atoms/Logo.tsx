import React from 'react';

export const Logo: React.FC = () => {
    return (
        <div className="flex items-center gap-3 text-[#111318] dark:text-white">
            <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-2xl">work</span>
            </div>
            <h2 className="text-xl font-bold leading-tight tracking-[-0.015em]">HRIS Technical Test Dexa</h2>
        </div>
    );
};
