import type { ReactNode } from "react";

import { cn } from "../../utils/cn";

export type Tone = "success" | "warning" | "danger" | "neutral";

const TONES: Record<Tone, string> = {
  success: "bg-green-500/15 text-green-800 dark:text-green-300",
  warning: "bg-amber-500/20 text-amber-800 dark:text-amber-300",
  danger: "bg-red-500/15 text-red-800 dark:text-red-300",
  neutral: "bg-gray-light/20 text-gray-semidark dark:text-gray-light",
};

const StatusBadge = ({
  tone = "neutral",
  children,
}: {
  tone?: Tone;
  children: ReactNode;
}) => {
  return (
    <span
      className={cn(
        "inline-block rounded-full px-3 py-1 text-sm font-medium whitespace-nowrap",
        TONES[tone],
      )}
    >
      {children}
    </span>
  );
};

export default StatusBadge;
