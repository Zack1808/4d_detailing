import { forwardRef } from "react";

import Container from "../../components/layout/Container";
import Button from "../../components/ui/Button";
import { InlineError } from "../../components/ui/InlineMessage";
import Reveal from "../../components/ui/Reveal";
import { Paragraph, SectionTitle } from "../../components/ui/Typography";
import ServiceGrid from "../services/ServiceGrid";

import { PATHS } from "../../config/paths";
import { useData } from "../../context/DataContext";

const FeaturedServices = forwardRef<HTMLElement>((_, ref) => {
  const { services, status, error, reload } = useData();

  const featured = services.filter((service) => service.isFeatured);

  return (
    <Container id="services" className="bg-light pt-40! dark:bg-dark" ref={ref}>
      <Reveal variant="left">
        <SectionTitle>Naše najpopularnije usluge</SectionTitle>
      </Reveal>
      <Reveal variant="left" delay={200}>
        <Paragraph className="mt-3">
          Odaberite jednu od naših najtraženijih usluga i priuštite svom vozilu
          temeljito čišćenje, obnovu i zaštitu. Izdvojili smo 3 paketa koje naši
          klijenti najčešće biraju.
        </Paragraph>
      </Reveal>

      <div className="mt-6 w-full">
        {status === "error" ? (
          <InlineError
            message={`Usluge trenutno nije moguće učitati. ${error ?? ""}`}
            onRetry={reload}
          />
        ) : (
          <ServiceGrid services={featured} />
        )}
      </div>

      <div className="mt-3 flex w-full flex-col justify-between gap-6 md:flex-row md:items-center">
        <div className="flex flex-col gap-3">
          <Reveal variant="left" threshold={0.5}>
            <h3 className="text-xl font-semibold">
              Ne znate koja je usluga najbolja za vaše vozilo?
            </h3>
          </Reveal>
          <Reveal variant="left">
            <Paragraph>
              Pogledajte kompletnu ponudu i pronađite paket koji vam odgovara.
            </Paragraph>
          </Reveal>
        </div>

        <Reveal variant="left">
          <Button variant="secondary" to={PATHS.services}>
            Pregledajte sve usluge
          </Button>
        </Reveal>
      </div>
    </Container>
  );
});

FeaturedServices.displayName = "FeaturedServices";

export default FeaturedServices;
