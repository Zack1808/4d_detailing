import { Skeleton, SkeletonRegion } from "../ui/Skeleton";

const AdminLoginSkeleton = () => (
  <SkeletonRegion
    label="Učitavanje prijave..."
    className="flex min-h-svh items-center justify-center p-6"
  >
    <div className="surface flex w-full max-w-md flex-col gap-6 p-9">
      <Skeleton className="size-12" />
      <Skeleton className="h-8 w-40" />
      <div className="flex flex-col gap-3">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-12 w-full" />
      </div>
      <div className="flex flex-col gap-3">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-12 w-full" />
      </div>
      <Skeleton className="h-12 w-full" />
    </div>
  </SkeletonRegion>
);

export default AdminLoginSkeleton;
