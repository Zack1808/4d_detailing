import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "../../utils/cn";

export const Skeleton = ({
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    arira-hidden="true"
    className={cn(
      "animate-pulse rounded-xs bg-gray-light/25 dark:bg-gray-dark/70",
      className,
    )}
    {...rest}
  />
);

const LINE_WIDTHS = ["w-full", "w-11/12", "w-5/6", "w-full", "w-3/4"];

export const SkeletonText = ({
  lines = 3,
  className,
  lineClassName,
}: {
  lines?: number;
  className?: string;
  lineClassName?: string;
}) => (
  <div
    aria-hidden="true"
    className={cn("flex w-full flex-col gap-2", className)}
  >
    {Array.from({ length: lines }, (_, i) => (
      <Skeleton
        key={i}
        className={cn(
          "h-4",
          i === lines - 1 && lines > 1 ? "w-2/3" : LINE_WIDTHS[i % 5],
          lineClassName,
        )}
      />
    ))}
  </div>
);

export const SkeletonRegion = ({
  label = "Učitavanje...",
  className,
  children,
}: {
  label?: string;
  className?: string;
  children: ReactNode;
}) => (
  <div role="status" aria-busy="true" aria-live="polite" className={className}>
    <span className="sr-only">{label}</span>
    {children}
  </div>
);
