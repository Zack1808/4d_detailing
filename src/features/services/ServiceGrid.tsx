import Reveal from "../../components/ui/Reveal";
import { Skeleton, SkeletonText } from "../../components/ui/Skeleton";
import ServiceCard from "./ServiceCard";

import type { ServiceDataType } from "../../types/data";

type ServiceGridProps = {
  services: ServiceDataType[];
  loading?: boolean;
  skeletonCount?: number;
};

const CardSkeleton = () => (
  <div
    aria-hidden="true"
    className="surface flex min-h-140 w-full flex-col gap-9 px-6 py-9"
  >
    <Skeleton className="h-8 w-2/3" />
    <Skeleton className="h-12 w-1/3" />
    <SkeletonText lines={5} />
    <Skeleton className="mt-auto h-12 w-full" />
  </div>
);

const ServiceGrid = ({
  services,
  loading = false,
  skeletonCount = 3,
}: ServiceGridProps) => {
  const slots = loading ? skeletonCount : services.length;

  return (
    <div
      className="grid w-full grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-3"
      aria-busy={loading || undefined}
    >
      {loading && (
        <span className="sr-only" role="status">
          Učitavanje usluga...
        </span>
      )}
      {Array.from({ length: slots }, (_, index) => (
        <Reveal key={index} className="flex h-full">
          {loading ? <CardSkeleton /> : <ServiceCard item={services[index]} />}
        </Reveal>
      ))}
    </div>
  );
};

export default ServiceGrid;
