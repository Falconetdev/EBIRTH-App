import { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CompactCountdownProps {
  startDate: string;
  className?: string;
}

export default function CompactCountdown({ startDate, className = '' }: CompactCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const targetDate = new Date(startDate).getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setIsStarted(true);
        return null;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [startDate]);

  if (isStarted) {
    return (
      <div className={`bg-white/5 border border-white/10 rounded-lg p-3 ${className}`}>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-green-400 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-white">Course Available Now</p>
            <p className="text-xs text-white/60">Enroll to start learning</p>
          </div>
        </div>
      </div>
    );
  }

  if (!timeLeft) {
    return null;
  }

  return (
    <div className={`bg-white/5 border border-white/10 rounded-lg p-3 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <Calendar className="h-4 w-4 text-[#FFD700] flex-shrink-0" />
        <p className="text-xs font-medium text-white/80 uppercase tracking-wide">Course Starts In</p>
      </div>

      <div className="flex items-start justify-between gap-2">
        <TimeUnit value={timeLeft.days} label="Days" />
        <span className="text-white/30 text-2xl font-bold leading-none pt-0.5">:</span>
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <span className="text-white/30 text-2xl font-bold leading-none pt-0.5">:</span>
        <TimeUnit value={timeLeft.minutes} label="Min" />
        <span className="text-white/30 text-2xl font-bold leading-none pt-0.5">:</span>
        <TimeUnit value={timeLeft.seconds} label="Sec" />
      </div>
    </div>
  );
}

interface TimeUnitProps {
  value: number;
  label: string;
}

function TimeUnit({ value, label }: TimeUnitProps) {
  return (
    <div className="flex flex-col items-center flex-1">
      <div className="text-2xl font-bold text-[#FFD700] tabular-nums">
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-[10px] text-white/50 uppercase tracking-wider mt-0.5">
        {label}
      </div>
    </div>
  );
}