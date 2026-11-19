import Reveal from "../../components/ui/Reveal";
import {
  Skeleton,
  SkeletonRegion,
  SkeletonText,
} from "../../components/ui/Skeleton";
import ServiceCard from "./ServiceCard";

import type { ServiceDataType } from "../../types/data";

const GRID = "grid w-full grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-3";

const ServiceGrid = ({ services }: { services: ServiceDataType[] }) => (
  <div className={GRID}>
    {services.map((service) => (
      <Reveal key={service.id} className="flex h-full">
        <ServiceCard item={service} />
      </Reveal>
    ))}
  </div>
);

export const ServiceGridSkeleton = ({ count = 3 }: { count?: number }) => (
  <SkeletonRegion label="Učitavanje usluga..." className={GRID}>
    {Array.from({ length: count }, (_, i) => (
      <div key={i} className="surface flex min-h-140 flex-col gap-9 px-6 py-9">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-12 w-1/3" />
        <SkeletonText lines={5} />
        <Skeleton className="mt-auto h-12 w-full" />
      </div>
    ))}
  </SkeletonRegion>
);

export default ServiceGrid;
