import React, { useState, useEffect } from 'react';

export const DigitalClock: React.FC = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timerId);
    }, []);

    return (
        <div className="text-4xl font-mono font-bold text-gray-800 tracking-wider">
            {time.toLocaleTimeString([], { hour12: false })}
        </div>
    );
};
