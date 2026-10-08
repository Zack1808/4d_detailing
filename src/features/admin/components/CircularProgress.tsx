import React, { useState, useEffect, useRef } from "react";

type CircularProgressProps = {
  value: number;
  min?: number;
  max?: number;
  label: string;
  duration?: number;
  valueText?: string;
  strokeWidth?: number;
  children?: React.ReactNode;
  className?: string;
};

const SIZE = 100;

const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  min = 0,
  max = 100,
  label,
  duration = 1000,
  valueText,
  strokeWidth = 8,
  children,
  className = "w-32 sm:w-40 md:w-48",
}) => {
  const range = max - min;
  const clamped = Math.min(max, Math.max(min, value));
  const percent = range > 0 ? ((clamped - min) / range) * 100 : 0;

  const radius = (SIZE - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const [displayed, setDisplayed] = useState<number>(0);
  const fromRef = useRef<number>(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce",
    ).matches;

    if (prefersReducedMotion || duration <= 0) {
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

  const offset = circumference * (1 - displayed / 100);

  return (
    <div
      className={`relative inline-block aspect-square ${className}`}
      role="progressbar"
      aria-label={label}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={clamped}
      aria-valuetext={valueText ?? `${Math.round(percent)}%`}
    >
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="h-full w-full -rotate-90"
        aria-hidden="true"
        focusable="false"
      >
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className="stroke-dark/20 dark:stroke-light/20"
        />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="stroke-dark dark:stroke-light"
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center text-center">
        {children ?? (
          <span className="text-2xl font-semibold tabular-nums text-slate-900 dark:text-slate-100 ">
            {Math.round(displayed)}%
          </span>
        )}
      </div>
    </div>
  );
};

export default CircularProgress;
