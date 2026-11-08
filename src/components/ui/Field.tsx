import type { ReactNode } from "react";
import { FaCircleExclamation } from "react-icons/fa6";

import { cn } from "../../utils/cn";

type FieldProps = {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  count?: { current: number; max: number };
  className?: string;
  children: ReactNode;
};

const Field = ({
  id,
  label,
  required,
  error,
  hint,
  count,
  className,
  children,
}: FieldProps) => {
  const showCount = count && count.current >= count.max * 0.8;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} id={`${id}-label`} className="font-light">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>

      {children}

      <div className="flex justify-between gap-3 text-sm">
        {error ? (
          <p
            id={`${id}-error`}
            className="flex items-start gap-2 text-red-600 dark:text-red-400"
          >
            <FaCircleExclamation
              className="mt-0.5 shrink-0"
              aria-hidden="true"
            />
            {error}
          </p>
        ) : (
          hint && (
            <p id={`${id}-hint`} className="font-light text-gray-light">
              {hint}
            </p>
          )
        )}

        {showCount && (
          <span
            className={cn(
              "ml-auto shrink-0 tabular-nums",
              count.current > count.max
                ? "text-red-600 dark:text-red-400"
                : "text-gray-light",
            )}
          >
            {count.current}/{count.max}
          </span>
        )}
      </div>
    </div>
  );
};

export default Field;
