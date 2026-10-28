import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import type { ServiceDataType } from "../types/data";

import Container from "../components/layout/Container";
import ImageCarousel from "../components/layout/ImageCarousel";
import Reveal from "../components/layout/Reveal";
import Button from "../components/common/Button";

import Input from "../components/common/Input";
import ServiceCard from "../components/common/ServiceCard";
import Select from "../components/common/Select";
import SEO from "../components/common/SEO";

import { useData } from "../context/DataContext";

import { generateServicesSchema } from "../utils/schema";
import { getCurrentPrice } from "../utils/pricing";

const SORTING_OPTIONS = [
  {
    value: "popularno",
    label: "Popularno",
  },
  {
    value: "cijena_rastuca",
    label: "Cijena rastuća",
  },
  {
    value: "cijena_padajuca",
    label: "Cijena padajuća",
  },
  {
    value: "abecedno",
    label: "Naziv A-Z",
  },
  {
    value: "trajanje_uzlazno",
    label: "Trajanje uzlazno",
  },
  {
    value: "trajanje_silazno",
    label: "Trajanje silazno",
  },
];

const IMAGES_CAROUSEL = [
  "/images/service1.avif",
  "/images/service2.avif",
  "/images/service3.avif",
  "/images/service4.avif",
];

const compareNumbers = (a: number, b: number, multiplier: number) => {
  if (a === b) return 0;
  if (!Number.isFinite(a)) return 1;
  if (!Number.isFinite(b)) return -1;

  return (a - b) * multiplier;
};

const Services: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getInitialFilters = () => {
    const params = new URLSearchParams(location.search);

    return {
      search: params.get("pretraga") || "",
      sortValue: params.get("sortiranje") || "popularno",
    };
  };

  const initialFilter = getInitialFilters();

  const [search, setSearch] = useState<string>(initialFilter.search);
  const [sortValue, setSortValue] = useState<string | string[]>(
    initialFilter.sortValue,
  );
  const [loading, setLoading] = useState<boolean>(false);

  const { services, priceArchive } = useData();

  const parseDuration = useCallback((duration: string) => {
    const normalized = duration
      .toLowerCase()
      .replace(",", ".")
      .replace(/\s+/g, " ")
      .trim();

    const numbers = normalized.match(/\d+(?:\.\d+)?/g)?.map(Number) ?? [];

    const isDays = normalized.includes("dan");
    const multiplier = isDays ? 24 : 1;

    if (numbers.length === 1) {
      const value = numbers[0] * multiplier;

      return {
        min: value,
        max: value,
      };
    }

    if (numbers.length >= 2) {
      return {
        min: numbers[0] * multiplier,
        max: numbers[1] * multiplier,
      };
    }

    return {
      min: Infinity,
      max: Infinity,
    };
  }, []);

  const sortList = useCallback(
    (
      list: ServiceDataType[],
      key: "price" | "isFeatured" | "title" | "duration",
      direction: "asc" | "desc",
    ) => {
      const multiplier = direction === "asc" ? 1 : -1;

      return [...list].sort((a, b) => {
        switch (key) {
          case "price":
            return (getCurrentPrice(a) - getCurrentPrice(b)) * multiplier;

          case "isFeatured":
            return (Number(a.isFeatured) - Number(b.isFeatured)) * multiplier;

          case "title":
            return a.title.localeCompare(b.title) * multiplier;

          case "duration":
            const durationA = parseDuration(a.duration);
            const durationB = parseDuration(b.duration);

            return (
              compareNumbers(durationA.min, durationB.min, multiplier) ||
              compareNumbers(durationA.max, durationB.max, multiplier)
            );

          default:
            return 0;
        }
      });
    },
    [parseDuration],
  );

  const downloadFile = async (url: string, fileName: string) => {
    setLoading(true);
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Download failed: ${response.status} ${response.statusText}`,
        );
      }

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();

      URL.revokeObjectURL(objectUrl);
    } catch (err: unknown) {
    } finally {
      setLoading(false);
    }
  };

  const displayServices = useMemo(() => {
    const searchTerm = search.toLowerCase();

    let newList = [...services]
      .filter((item) => item.status === "active")
      .sort((a, b) => a.sortOrder - b.sortOrder);

    switch (sortValue) {
      case "popularno":
        newList = sortList(newList, "isFeatured", "desc");
        break;
      case "cijena_rastuca":
        newList = sortList(newList, "price", "asc");
        break;
      case "cijena_padajuca":
        newList = sortList(newList, "price", "desc");
        break;
      case "abecedno":
        newList = sortList(newList, "title", "asc");
        break;
      case "trajanje_uzlazno":
        newList = sortList(newList, "duration", "asc");
        break;
      case "trajanje_silazno":
        newList = sortList(newList, "duration", "desc");
        break;
    }

    newList = newList.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm) ||
        item.services.some((service) =>
          service.toLowerCase().includes(searchTerm),
        ) ||
        item.keywords?.some((keyword) =>
          keyword.toLowerCase().includes(searchTerm),
        ),
    );

    return newList;
  }, [services, search, sortValue, sortList]);

  const currentPriceTable = useMemo(
    () => priceArchive.find((item) => item.isCurrent),
    [priceArchive],
  );

  useEffect(() => {
    let searchParams = {};

    if (search) searchParams = { ...searchParams, pretraga: search };
    searchParams = { ...searchParams, sortiranje: sortValue };

    const params = new URLSearchParams(searchParams);

    navigate(`/usluge?${params.toString()}`, { replace: true });
  }, [search, sortValue]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="overflow-hidden">
      <SEO
        title="Usluge Detailinga - Pranje, Poliranje i Zaštita Vozila | 4D Detailing"
        canonical="https://4d-detailing.hr/usluge"
        schema={
          services.length > 0 ? generateServicesSchema(services) : undefined
        }
      />

      <Container className="pb-3!" id="Service-intro">
        <div className="flex gap-3 w-full justify-between">
          <div className="flex flex-col gap-6">
            <Reveal
              transitionFrom="opacity-0 -translate-x-6"
              transitionTo="opacity-100 translate-x-0"
            >
              <h2 className="text-4xl text-dark dark:text-light mt-30 font-bold">
                Naše usluge
              </h2>
            </Reveal>
            <div>
              <Reveal
                transitionFrom="opacity-0 -translate-x-6"
                transitionTo="opacity-100 translate-x-0"
                delay={200}
              >
                <p className="text-dark dark:text-light max-w-[85ch] mt-3 font-light">
                  Svako vozilo ima svoje potrebe, a kvalitetna njega počinje
                  pravim odabirom usluge. U 4D Detailingu zato nudimo različite
                  tretmane kojima možemo osvježiti, obnoviti i zaštititi vaše
                  vozilo – izvana i iznutra.
                </p>
              </Reveal>
              <Reveal
                transitionFrom="opacity-0 -translate-x-6"
                transitionTo={`opacity-100 translate-x-0`}
                delay={300}
              >
                <p className="text-dark dark:text-light max-w-[85ch] mt-3 font-light">
                  Naša ponuda obuhvaća temeljitu njegu interijera, održavanje i
                  čišćenje eksterijera, profesionalno poliranje te pažljivo
                  osmišljene pakete za one koji žele kombinirati više usluga.
                </p>
              </Reveal>
              <Reveal
                transitionFrom="opacity-0 -translate-x-6"
                transitionTo={`opacity-100 translate-x-0`}
                delay={400}
              >
                <p className="text-dark dark:text-light max-w-[85ch] mt-3 font-light">
                  Bez obzira želite li samo osvježiti izgled vozila, ukloniti
                  tragove svakodnevnog korištenja ili mu pružiti kompletnu
                  njegu, pronaći ćete opciju prilagođenu svojim potrebama.
                </p>
              </Reveal>
              <Reveal
                transitionFrom="opacity-0 -translate-x-6"
                transitionTo={`opacity-100 translate-x-0`}
                delay={500}
              >
                <p className="text-dark dark:text-light max-w-[85ch] mt-3 font-light">
                  <strong className="font-semibold">
                    Istražite našu ponudu i pronađite tretman koji najbolje
                    odgovara vašem vozilu.
                  </strong>
                </p>
              </Reveal>
              <Reveal
                transitionFrom="opacity-0 -translate-x-6"
                transitionTo={`opacity-100 translate-x-0`}
                delay={600}
              >
                <p className="text-dark dark:text-light max-w-[85ch] mt-3 font-light">
                  Trebate cijene pri ruci?{" "}
                  <strong className="font-semibold">
                    Preuzmite tablicu cjenika ili zavirite u arhivu starijih
                    cjenika.
                  </strong>
                </p>
              </Reveal>
              <Reveal
                transitionFrom="opacity-0 -translate-x-6"
                transitionTo={`opacity-100 translate-x-0`}
                delay={700}
                className="mt-9 flex gap-3 flex-col md:flex-row"
              >
                {currentPriceTable?.isCurrent && (
                  <Button
                    variant="primary"
                    loading={loading}
                    onClick={() =>
                      downloadFile(
                        currentPriceTable.downloadLink,
                        currentPriceTable.name,
                      )
                    }
                  >
                    Preuzmi aktualni cijenik
                  </Button>
                )}
                {priceArchive.length > 0 && (
                  <Button variant="none" to="/arhiva-cijenika">
                    Pregledaj arhivu cijenika
                  </Button>
                )}
              </Reveal>
            </div>
          </div>
          <Reveal
            transitionFrom="opacity-0 translate-x-6"
            transitionTo={`opacity-100 translate-x-0`}
            className=" md:w-5/12 hidden 2xl:flex mt-30 aspect-video overflow-hidden"
            delay={200}
          >
            <ImageCarousel images={IMAGES_CAROUSEL} />
          </Reveal>
        </div>
      </Container>
      <Container className="pt-9!" id="services-list">
        <Reveal
          transitionFrom="opacity-0 -translate-x-6"
          transitionTo={`opacity-100 translate-x-0`}
          delay={200}
        >
          <h3 className="font-semibold text-2xl text-dark dark:text-light">
            Usluge
          </h3>
        </Reveal>
        <Reveal
          transitionFrom="opacity-0"
          transitionTo="opacity-100 duration-1000"
          className={`p-3 w-full bg-gray-light/15 dark:bg-gray-dark/40 rounded-xs flex gap-3 md:flex-row flex-col`}
          delay={300}
        >
          <div className="flex gap-3 md:items-center flex-1/3 md:flex-row flex-col">
            <Input
              placeholder="Pranje, poliranje, čišćenje..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <div className="flex gap-3 md:items-center flex-1 md:flex-row flex-col">
            <label
              htmlFor="sorting"
              className="text-dark dark:text-light font-medium"
            >
              Sortiraj:
            </label>
            <Select
              options={[...SORTING_OPTIONS]}
              id="sorting"
              value={sortValue}
              onChange={(value: string | string[]) => setSortValue(value)}
              defaultValue={sortValue}
            />
          </div>
        </Reveal>
        <Reveal
          transitionTo="opacity-100"
          className="w-full grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-3"
          delay={400}
          threshold={0.01}
        >
          {displayServices.map((service) => {
            return (
              <Reveal
                key={`${service.id}}`}
                className={`xl:nth-[3n+2]:delay-100! xl:nth-[3n]:delay-200! lg:nth-[2n]:delay-100! flex h-full md:duration-1000 duration-500`}
                threshold={0.05}
              >
                <ServiceCard item={service} />
              </Reveal>
            );
          })}
        </Reveal>
      </Container>
    </main>
  );
};

export default Services;
