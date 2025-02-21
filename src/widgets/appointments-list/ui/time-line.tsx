import { useState, useEffect } from 'react';
import { START_HOUR } from '../domain/time-grid';

function calculateTimeIndicatorPosition() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  return {
    position: (hours - START_HOUR + 1) * 60 + minutes,
    minutes,
    hours,
  };
}

export const TimeIndicator = () => {
  const [position, setPosition] = useState(
    calculateTimeIndicatorPosition()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(calculateTimeIndicatorPosition());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-0 -left-3 right-0 pointer-events-none">
      <div
        className="absolute left-0 right-0 h-[2px] bg-red-500 z-50"
        style={{ top: `${position.position}px` }}
      />
      <div
        className="absolute text-white font-bold px-2 py-1 text-sm bg-red-500 rounded-full z-50 -left-2"
        style={{
          top: `${position.position - 12}px`,
        }}
      >
        {position.hours}:{position.minutes}
      </div>
    </div>
  );
};
