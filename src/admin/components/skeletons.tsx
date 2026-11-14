import { HeadRow, TableShell, Th } from "./Table";

import {
  Skeleton,
  SkeletonRegion,
  SkeletonText,
} from "../../components/ui/Skeleton";

import { cn } from "../../utils/cn";

export type SkeletonColumn = {
  title: string;
  lines: string[];
  align?: "right";
};

export const TableSkeleton = ({
  columns,
  rows = 5,
}: {
  columns: SkeletonColumn[];
  rows?: number;
}) => (
  <SkeletonRegion className="w-full">
    <TableShell>
      <HeadRow>
        {columns.map((column) => (
          <Th
            key={column.title}
            className={column.align === "right" ? "text-right" : undefined}
          >
            {column.title}
          </Th>
        ))}
      </HeadRow>
      <tbody>
        {Array.from({ length: rows }, (_, row) => (
          <tr key={row} className="border-t border-gray-light/20">
            {columns.map((column) => (
              <td key={column.title} className="px-4 py-3 align-top">
                <div
                  className={cn(
                    "flex flex-col gap-2",
                    column.align === "right" && "items-end",
                  )}
                >
                  {column.lines.map((width, line) => (
                    <Skeleton key={line} className={cn("h-4", width)} />
                  ))}
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </TableShell>
  </SkeletonRegion>
);

export const APPOINTMENT_COLUMNS: SkeletonColumn[] = [
  { title: "Datum", lines: ["w-24"] },
  { title: "Klijent", lines: ["w-32", "w-40", "w-28"] },
  { title: "Usluga i vozilo", lines: ["w-44", "w-28"] },
  { title: "Status", lines: ["h-6! w-24 rounded-full"] },
  { title: "Akcije", lines: ["h-9! w-48"], align: "right" },
];

export const SERVICE_COLUMNS: SkeletonColumn[] = [
  { title: "Naziv", lines: ["w-56"] },
  { title: "Status", lines: ["h-6! w-20 rounded-full"] },
  { title: "Trajanje", lines: ["w-16"] },
  { title: "Cijena (auto)", lines: ["w-12"] },
  { title: "Redoslijed", lines: ["w-6"] },
  { title: "Akcije", lines: ["h-9! w-36"], align: "right" },
];

export const BLOCKED_COLUMNS: SkeletonColumn[] = [
  { title: "Od", lines: ["w-24"] },
  { title: "Do", lines: ["w-24"] },
  { title: "Razlog", lines: ["w-44"] },
  { title: "Akcije", lines: ["h-9! w-20"], align: "right" },
];

export const PRICE_TABLE_COLUMNS: SkeletonColumn[] = [
  { title: "Naziv", lines: ["w-48"] },
  { title: "Datum", lines: ["w-24"] },
  { title: "Status", lines: ["h-6! w-20 rounded-full"] },
  { title: "Akcije", lines: ["h-9! w-52"], align: "right" },
];

export const ReviewListSkeleton = ({ count = 3 }: { count?: number }) => (
  <SkeletonRegion>
    <ul className="flex flex-col gap-3">
      {Array.from({ length: count }, (_, i) => (
        <li key={i} className="surface flex flex-col gap-3 p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-col gap-3">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-28" />
            </div>
            <Skeleton className="h-7 w-24 rounded-full" />
          </div>
          <SkeletonText lines={3} className="max-w-[85ch]" />
          <div className="flex gap-3">
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-20" />
          </div>
        </li>
      ))}
    </ul>
  </SkeletonRegion>
);

export const ListCardSkeleton = () => (
  <section className="surface flex flex-1 flex-col gap-3 p-6">
    <div className="flex items-center justify-between gap-3">
      <Skeleton className="h-6 w-48" />
      <Skeleton className="h-4 w-20" />
    </div>
    <ul className="flex flex-col gap-3">
      {[0, 1, 2].map((i) => (
        <li
          key={i}
          className="flex flex-col gap-3 border-t border-gray-light/20 pt-3 first:bordet-t-0 first:pt-0"
        >
          <Skeleton className="h-5 w-56" />
          <Skeleton className="h-4 w-72 max-w-full" />
        </li>
      ))}
    </ul>
  </section>
);

export const DashboardSkeleton = () => (
  <SkeletonRegion className="flex flex-col gap-9">
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="surface flex flex-1 flex-col gap-3 p-6">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-12 w-16" />
        </div>
      ))}
    </div>
    <ListCardSkeleton />
    <ListCardSkeleton />
    <div className="surface flex flex-col gap-3 p-6">
      <Skeleton className="h-6 w-40" />
      <SkeletonText lines={2} className="max-w-[70ch]" />
    </div>
  </SkeletonRegion>
);
