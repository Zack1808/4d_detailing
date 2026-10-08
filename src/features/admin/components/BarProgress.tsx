import React, { useEffect, useRef, useState } from "react";

type BarProgress = {
  value: number;
  min?: number;
  max?: number;
  label: string;
  duration?: number;
  valueText?: string;
  children?: React.ReactNode;
  className?: string;
};

const BarProgress: React.FC<BarProgress> = ({
  value,
  min = 0,
  max = 100,
  label,
  duration = 1000,
  valueText,
  children,
  className = "w-full",
}) => {
  const range = max - min;
  const clamped = Math.min(max, Math.max(min, value));
  const percent = range > 0 ? ((clamped - min) / range) * 100 : 0;

  const [displayed, setDisplayed] = useState<number>(0);
  const fromRef = useRef<number>(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced || duration <= 0) {
      fromRef.current = percent;
      setDisplayed(percent);
      return;
    }

    const from = fromRef.current;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = from + (percent - from) * eased;
      fromRef.current = current;
      setDisplayed(current);
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [percent, duration]);

  return (
    <div className={className}>
      <div className="mb-1 5 flex itmes-center justify-end text-sm text-slate-900 sm:text-base dark:text-slate-100">
        {children ?? (
          <span className="font-semibold tabular-nums">
            {Math.round(displayed)}%
          </span>
        )}
      </div>
      <div
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={clamped}
        aria-valuetext={valueText ?? `${Math.round(percent)}%`}
        className="h-(--progress-height,0.75rem) w-full overflow-hidden rounded-full bg-dark/20 dark:bg-light/20"
      >
        <div
          className="h-full rounded-full bg-dark dark:bg-light"
          style={{ width: `${displayed}%` }}
        />
      </div>
    </div>
  );
};

export default BarProgress;
