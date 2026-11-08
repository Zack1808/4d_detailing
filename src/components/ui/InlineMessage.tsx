import type { ReactNode } from "react";
import { FaCircleExclamation } from "react-icons/fa6";

import Button from "./Button";

type InlineErrorProps = {
  message: ReactNode;
  onRetry?: () => void;
};

export const InlineError = ({ message, onRetry }: InlineErrorProps) => (
  <div
    role="alert"
    className="surface flex w-full flex-col items-start gap-3 p-6 md:flex-row md:items-center"
  >
    <FaCircleExclamation
      className="text-2xl text-red-600 dark:text-red-400"
      aria-hidden="true"
    />
    <p className="flex-1 font-light">{message}</p>
    {onRetry && (
      <Button variant="secondary" onClick={onRetry}>
        Pokušaj ponovno
      </Button>
    )}
  </div>
);
