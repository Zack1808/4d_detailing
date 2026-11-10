import type { HTMLAttributes, ReactNode, ThHTMLAttributes } from "react";

import { cn } from "../../utils/cn";

export const TableShell = ({ children }: { children: ReactNode }) => (
  <div className="surface w-full overflow-x-auto">
    <table className="w-full min-w-170 border-collapse text-left">
      {children}
    </table>
  </div>
);

export const Th = ({
  className,
  ...rest
}: ThHTMLAttributes<HTMLTableCellElement>) => {
  <th
    scope="col"
    className={cn(
      "px-4 py-3 text-sm font-semibold tracking-wide whitespace-nowrap uppercase",
      className,
    )}
    {...rest}
  />;
};

export const Td = ({
  className,
  ...rest
}: HTMLAttributes<HTMLTableCellElement>) => (
  <td className={cn("px-4 py-3 align-top font-light", className)} {...rest} />
);

export const HeadRow = ({ children }: { children: ReactNode }) => (
  <thead>
    <tr className="bg-gray-light/15 dark:bg-gray-dark/40">{children}</tr>
  </thead>
);

export const BodyRow = ({
  className,
  ...rest
}: HTMLAttributes<HTMLTableRowElement>) => (
  <tr
    className={cn(
      "border-t border-gray-light/20 transition-colors hover:bg-gray-light/10",
      className,
    )}
    {...rest}
  />
);
