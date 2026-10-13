import React from "react";

type SpinnerSize = "sm" | "md" | "lg" | "xl";

type SpinnerProps = {
  size?: SpinnerSize;
  label?: string;
  className?: string;
};

const sizeClasses: Record<SpinnerSize, string> = {
  sm: "h-4 w-4 border-2",
  md: "h-8 w-8 border-[3px]",
  lg: "h-12 w-12 border-4",
  xl: "h-16 w-16 border-4",
};

const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  label = "Loading...",
  className = "",
}) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`inline-flex ${className}`}
    >
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-dark/20 border-t-dark dark:border-light/20 dark:border-t-light`}
      ></div>
      <span className="sr-only">{label}</span>
    </div>
  );
};

export default Spinner;
