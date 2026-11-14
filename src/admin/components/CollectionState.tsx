import type { ReactNode } from "react";

import { InlineError } from "../../components/ui/InlineMessage";

import { APPOINTMENT_COLUMNS, TableSkeleton } from "./skeletons";

type CollectionStateProps = {
  status: "loading" | "ready" | "error";
  error: string | null;
  onRetry: () => void;
  isEmpty?: boolean;
  emptyMessage?: string;
  skeleton?: ReactNode;
  children: ReactNode;
};

const CollectionState = ({
  status,
  error,
  onRetry,
  isEmpty,
  emptyMessage = "Nema podataka za prikaz",
  skeleton,
  children,
}: CollectionStateProps) => {
  if (status === "loading") {
    return skeleton ?? <TableSkeleton columns={APPOINTMENT_COLUMNS} rows={4} />;
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
