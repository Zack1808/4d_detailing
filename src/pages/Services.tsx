import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import SEO from "../components/seo/SEO";
import Container from "../components/layout/Container";
import Button from "../components/ui/Button";
import ImageCarousel from "../components/ui/ImageCarousel";
import Input from "../components/ui/Input";
import { InlineError } from "../components/ui/InlineMessage";
import Reveal from "../components/ui/Reveal";
import Select from "../components/ui/Select";
import { PageTitle, Paragraph, SubTitle } from "../components/ui/Typography";
import ServiceGrid from "../features/services/ServiceGrid";

import { PATHS } from "../config/paths";
import { PAGE_META } from "../config/seo";
import { useData } from "../context/DataContext";
import { useFileDownload } from "../hooks/useFileDownload";
import { getCurrentPrice } from "../utils/pricing";
import { generateServicesSchema } from "../utils/schema";
import { normalizeText } from "../utils/text";

import type { ServiceDataType } from "../types/data";

const SORTING_OPTIONS = [
  { value: "popularno", label: "Popularno" },
  { value: "cijena_rastuca", label: "Cijena rastuća" },
  { value: "cijena_padajuca", label: "Cijena padajuća" },
  { value: "abecedno", label: "Naziv A-Z" },
];

const DEFAULT_SORT = "popularno";

const CAROUSEL_IMAGES = [
  "/images/service1.avif",
  "/images/service2.avif",
  "/images/service3.avif",
  "/images/service4.avif",
];

/** `services` arrive sorted by `sortOrder`; sorting here is stable on top of that. */
const sortServices = (list: ServiceDataType[], sort: string) => {
  const sorted = [...list];

  switch (sort) {
    case "popularno":
      return sorted.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
    case "cijena_rastuca":
      return sorted.sort((a, b) => getCurrentPrice(a) - getCurrentPrice(b));
    case "cijena_padajuca":
      return sorted.sort((a, b) => getCurrentPrice(b) - getCurrentPrice(a));
    case "abecedno":
      return sorted.sort((a, b) => a.title.localeCompare(b.title, "hr"));
    default:
      return sorted;
  }
};

const matchesSearch = (item: ServiceDataType, term: string) =>
  [item.title, ...item.services, ...(item.keywords ?? [])].some((text) =>
    normalizeText(text).includes(term),
  );

const Services = () => {
  const { services, priceArchive, status, error, reload } = useData();
  const { activeKey, download } = useFileDownload();

  // Search and sort live in the URL so the view can be shared / reloaded.
  const [params, setParams] = useSearchParams();
  const search = params.get("pretraga") ?? "";
  const sort = params.get("sortiranje") ?? DEFAULT_SORT;

  const updateParams = (changes: Record<string, string>) => {
    const next = new URLSearchParams(params);

    Object.entries(changes).forEach(([key, value]) => {
      if (value) next.set(key, value);
      else next.delete(key);
    });

    setParams(next, { replace: true });
  };

  const displayed = useMemo(() => {
    const term = normalizeText(search);

    return sortServices(services, sort).filter((item) =>
      matchesSearch(item, term),
    );
  }, [services, search, sort]);

  const currentPriceTable = priceArchive.find((item) => item.isCurrent);

  return (
    <main className="overflow-hidden">
      <SEO
        {...PAGE_META.services}
        schema={
          services.length > 0 ? generateServicesSchema(services) : undefined
        }
      />

      <Container className="pb-3!">
        <div className="flex w-full justify-between gap-3">
          <div className="flex flex-col gap-6">
            <Reveal variant="left">
              <PageTitle>Naše usluge</PageTitle>
            </Reveal>
            <div className="flex flex-col gap-3">
              <Reveal variant="left" delay={200}>
                <Paragraph>
                  Svako vozilo ima svoje potrebe, a kvalitetna njega počinje
                  pravim odabirom usluge. U 4D Detailingu zato nudimo različite
                  tretmane kojima možemo osvježiti, obnoviti i zaštititi vaše
                  vozilo – izvana i iznutra.
                </Paragraph>
              </Reveal>
              <Reveal variant="left" delay={300}>
                <Paragraph>
                  Naša ponuda obuhvaća temeljitu njegu interijera, održavanje i
                  čišćenje eksterijera, profesionalno poliranje te pažljivo
                  osmišljene pakete za one koji žele kombinirati više usluga.
                </Paragraph>
              </Reveal>
              <Reveal variant="left" delay={400}>
                <Paragraph>
                  Bez obzira želite li samo osvježiti izgled vozila, ukloniti
                  tragove svakodnevnog korištenja ili mu pružiti kompletnu
                  njegu, pronaći ćete opciju prilagođenu svojim potrebama.
                </Paragraph>
              </Reveal>
              <Reveal variant="left" delay={500}>
                <Paragraph>
                  <strong className="font-semibold">
                    Istražite našu ponudu i pronađite tretman koji najbolje
                    odgovara vašem vozilu.
                  </strong>
                </Paragraph>
              </Reveal>
              <Reveal variant="left" delay={600}>
                <Paragraph>
                  Trebate cijene pri ruci?{" "}
                  <strong className="font-semibold">
                    Preuzmite tablicu cjenika ili zavirite u arhivu starijih
                    cjenika.
                  </strong>
                </Paragraph>
              </Reveal>
              <Reveal
                variant="left"
                delay={700}
                className="mt-6 flex flex-col gap-3 md:flex-row"
              >
                {currentPriceTable && (
                  <Button
                    variant="primary"
                    loading={activeKey === currentPriceTable.id}
                    onClick={() =>
                      download(
                        currentPriceTable.id,
                        currentPriceTable.downloadLink,
                        currentPriceTable.name,
                      )
                    }
                  >
                    Preuzmi aktualni cijenik
                  </Button>
                )}
                {priceArchive.length > 0 && (
                  <Button variant="none" to={PATHS.priceArchive}>
                    Pregledaj arhivu cijenika
                  </Button>
                )}
              </Reveal>
            </div>
          </div>

          <Reveal
            variant="right"
            delay={200}
            className="mt-30 hidden aspect-video overflow-hidden md:w-5/12 2xl:flex"
          >
            <ImageCarousel
              images={CAROUSEL_IMAGES}
              label="Fotografije naših usluga"
            />
          </Reveal>
        </div>
      </Container>

      <Container className="pt-9!">
        <Reveal variant="left" delay={200}>
          <SubTitle>Usluge</SubTitle>
        </Reveal>

        <Reveal
          variant="fade"
          delay={300}
          className="surface flex w-full flex-col gap-3 p-3 md:flex-row"
        >
          <div className="flex flex-1/3 flex-col gap-3 md:flex-row md:items-center">
            <Input
              type="search"
              aria-label="Pretraži usluge"
              placeholder="Pranje, poliranje, čišćenje..."
              value={search}
              onChange={(event) =>
                updateParams({ pretraga: event.target.value })
              }
            />
          </div>
          <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center">
            <label htmlFor="sorting" id="sorting-label" className="font-medium">
              Sortiraj:
            </label>
            <Select
              id="sorting"
              options={SORTING_OPTIONS}
              value={sort}
              onChange={(value) => updateParams({ sortiranje: value })}
            />
          </div>
        </Reveal>

        {status === "error" ? (
          <InlineError
            message={`Usluge trenutno nije moguće učitati. ${error ?? ""}`}
            onRetry={reload}
          />
        ) : displayed.length === 0 ? (
          <div
            className="surface flex w-full flex-col items-start gap-3 p-6"
            role="status"
          >
            <p className="font-light">
              {services.length === 0
                ? "Trenutno nema dostupnih usluga."
                : "Nema usluga koje odgovaraju pretrazi."}
            </p>
            {search && (
              <Button
                variant="secondary"
                onClick={() => updateParams({ pretraga: "" })}
              >
                Očisti pretragu
              </Button>
            )}
          </div>
        ) : (
          <Reveal
            variant="fade"
            delay={400}
            threshold={0.01}
            className="w-full"
          >
            <ServiceGrid services={displayed} />
          </Reveal>
        )}
      </Container>
    </main>
  );
};

export default Services;
