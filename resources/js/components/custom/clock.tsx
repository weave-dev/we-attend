import { Calendar1, Clock1 } from 'lucide-react';
import { useEffect, useState } from 'react';

function Clock({ className }: { className?: string }) {
    const [time, setTime] = useState(new Date());
    const iconSize = {
        height: '2.25rem',
        width: '2.25rem',
    };
    useEffect(() => {
        // Set up an interval to update the time every second
        const timerId = setInterval(() => {
            setTime(new Date());
        }, 1000); // Update every 1000 milliseconds (1 second)

        // Clean up the interval when the component unmounts
        return () => {
            clearInterval(timerId);
        };
    }, []); // Empty dependency array ensures this effect runs only once on mount

    return (
        <div className={className}>
            <p className="flex gap-8 text-5xl font-semibold">
                <span className="flex items-center gap-2">
                    <Calendar1 {...iconSize} strokeWidth={1} />
                    {time.toLocaleDateString()}
                </span>
                <span className="flex items-center gap-2">
                    <Clock1 {...iconSize} strokeWidth={1} />
                    {time.toLocaleTimeString()}
                </span>
            </p>
        </div>
    );
}

export default Clock;
