import Reveal from "../../components/ui/Reveal";
import ServiceCard from "./ServiceCard";

import type { ServiceDataType } from "../../types/data";

const ServiceGrid = ({ services }: { services: ServiceDataType[] }) => (
  <div className="grid w-full grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-3">
    {services.map((service) => (
      <Reveal
        key={service.id}
        threshold={0.05}
        className="flex h-full duration-500 md:duration-1000 lg:max-xl:nth-[2n]:delay-100! xl:nth-[3n+2]:delay-100! xl:nth-[3n]:delay-200!"
      >
        <ServiceCard item={service} />
      </Reveal>
    ))}
  </div>
);

export default ServiceGrid;
