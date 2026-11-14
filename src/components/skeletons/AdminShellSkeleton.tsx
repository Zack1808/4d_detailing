import { Skeleton, SkeletonRegion } from "../ui/Skeleton";

const AdminShellSkeleton = () => (
  <SkeletonRegion
    label="Učitavanje administracije"
    className="flex min-h-svh flex-col lg:flex-row"
  >
    <aside className="flex flex-col gap-3 border-b border-gray-light/20 p-3 lg:h-svh lg:w-64 lg:gap-9 lg:border-r lg:border-b-0 lg:p-6">
      <div className="flex items center gap-3">
        <Skeleton className="size-10" />
        <Skeleton className="h-6 w-20" />
      </div>
      <div className="flex gap-1 lg:flex-col">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-10 w-28 lg:w-full" />
        ))}
      </div>
    </aside>

    <main className="flex flex-1 flex-col gap-9 p-6 md:p-9">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-4 w-full max-w-md" />
      </div>
      <Skeleton className="h-64 w-full" />
    </main>
  </SkeletonRegion>
);

export default AdminShellSkeleton;
