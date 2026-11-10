import type { ReactNode } from "react";

import Loader from "../../components/ui/Loader";
import { InlineError } from "../../components/ui/InlineMessage";

type CollectionStateProps = {
  status: "loading" | "ready" | "error";
  error: string | null;
  onRetry: () => void;
  isEmpty?: boolean;
  emptyMessage?: string;
  children: ReactNode;
};

const CollectionState = ({
  status,
  error,
  onRetry,
  isEmpty,
  emptyMessage = "Nema podataka za prikaz",
  children,
}: CollectionStateProps) => {
  if (status === "loading") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex w-full justify-center py-20"
      >
        <Loader size="md" />
        <span className="sr-only">Učitavanje...</span>
      </div>
    );
  }

  if (status === "error") {
    return <InlineError message={error} onRetry={onRetry} />;
  }

  if (isEmpty) {
    return (
      <p className="surface w-full p-9 text-center font-light text-gray-light">
        {emptyMessage}
      </p>
    );
  }

  return <>{children}</>;
};

export default CollectionState;
