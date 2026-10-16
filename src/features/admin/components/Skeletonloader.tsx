import React from "react";

type SkeletonPropsType = {
  loading: boolean;
  circle?: boolean;
  children?: React.ReactNode;
  className?: string;
};

const SkeletonLoader: React.FC<SkeletonPropsType> = ({
  loading,
  circle,
  children,
  className = "",
}) => {
  if (!loading) return <>{children}</>;

  if (children !== null && children !== false)
    return (
      <span
        className={`flex motion-safe:animate-pulse bg-gray-dark/40 dark:bg-gray-light/20 ${circle ? "rounded-full aspect-square!" : "rounded-xs"} ${className}`}
      >
        <span className="invisible">{children}</span>
      </span>
    );
};

export default SkeletonLoader;
