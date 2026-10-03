import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import type { ServiceType } from "../../catalog/types";

import Container from "@shared/components/Container";
import ImageCarousel from "@features/site/components/ImageCarousel";
import Reveal from "@shared/components/Reveal";

import Input from "@shared/components/Input";
import ServiceCard from "../components/ServiceCard";
import Select from "@shared/components/Select";
import Button from "@shared/components/Button";
import SEO from "@shared/components/SEO";

import { useCatalog } from "../../catalog/context/CatalogContext";

import { generateServicesSchema } from "@features/site/utils/schema";

type Category =
  "all" | "interijer" | "eksterijer" | "poliranje_i_zastita" | "posebni_paketi";

const SORTING_OPTIONS = [
  { value: "popularno", label: "Popularno" },
  { value: "cijena_rastuca", label: "Cijena rastuća" },
  { value: "cijena_padajuca", label: "Cijena padajuća" },
  { value: "abecedno", label: "Naziv A-Z" },
  { value: "trajanje_uzlazno", label: "Trajanje uzlazno" },
  { value: "trajanje_silazno", label: "Trajanje silazno" },
] as const;

const CATEGORIES = {
  interijer: "interior",
  eksterijer: "exterior",
  poliranje_i_zastita: "polishing",
  posebni_paketi: "package",
};

const IMAGES_CAROUSEL = [
  "/images/service1.avif",
  "/images/service2.avif",
  "/images/service3.avif",
  "/images/service4.avif",
];

const Services: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getInitialFilters = () => {
    const params = new URLSearchParams(location.search);

    return {
      category: (params.get("kategorija") as Category) || "all",
      search: params.get("pretraga") || "",
      sortValue: params.get("sortiranje") || "popularno",
    };
  };

  const initialFilters = getInitialFilters();

  const [search, setSearch] = useState<string>(initialFilters.search);
  const [sortValue, setSortValue] = useState<string | string[]>(
    initialFilters.sortValue,
  );
  const [category, setCategory] = useState<Category>(initialFilters.category);

  const { services } = useCatalog();

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
      list: ServiceType[],
      key: keyof ServiceType,
      direction: "asc" | "desc",
    ) => {
      const multiplier = direction === "asc" ? 1 : -1;

      return [...list].sort((a, b) => {
        switch (key) {
          case "priceFrom":
            return (a.priceFrom.current - b.priceFrom.current) * multiplier;

          case "isFeatured":
            return (Number(a.isFeatured) - Number(b.isFeatured)) * multiplier;

          case "title":
            return a.title.localeCompare(b.title) * multiplier;

          case "duration": {
            const durationA = parseDuration(a.duration);
            const durationB = parseDuration(b.duration);
            return (
              (durationA.min - durationB.min) * multiplier ||
              (durationA.max - durationB.max) * multiplier
            );
          }

          default:
            return 0;
        }
      });
    },
    [parseDuration],
  );

  const displayServices = useMemo(() => {
    let newList = [...services];
    const searchTerm = search.toLowerCase();

    if (category !== "all") {
      newList = newList.filter(
        (item) => item.category === CATEGORIES[category],
      );
    }

    switch (sortValue) {
      case "popularno":
        newList = sortList(newList, "isFeatured", "desc");
        break;
      case "cijena_rastuca":
        newList = sortList(newList, "priceFrom", "asc");
        break;
      case "cijena_padajuca":
        newList = sortList(newList, "priceFrom", "desc");
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
  }, [services, search, category, sortValue]);

  useEffect(() => {
    let searchParams = {};

    if (search) searchParams = { ...searchParams, pretraga: search };
    if (category !== "all")
      searchParams = { ...searchParams, kategorija: category };
    searchParams = { ...searchParams, sortiranje: sortValue };

    const params = new URLSearchParams(searchParams);

    navigate(`/usluge?${params.toString()}`, { replace: true });
  }, [category, search, sortValue]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="overflow-hidden">
      <SEO
        title="Usluge Detailinga – Pranje, Poliranje i Zaštita Vozila | 4D Detailing"
        canonical="https://4d-detailing.hr/usluge"
        schema={
          services.length > 0 ? generateServicesSchema(services) : undefined
        }
      />
      <Container className="pb-3!" id="service-intro">
        <div className="flex gap-3 w-full justify-between">
          <div className="flex flex-col gap-6">
            <Reveal
              transitionFrom="opacity-0 -translate-x-6"
              transitionTo={`opacity-100 translate-x-0`}
            >
              <h2 className="text-4xl text-dark dark:text-light mt-30 font-bold">
                Naše usluge
              </h2>
            </Reveal>
            <div>
              <Reveal
                transitionFrom="opacity-0 -translate-x-6"
                transitionTo={`opacity-100 translate-x-0`}
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
                  Našu ponudu podijelili smo u četiri glavne kategorije:
                  temeljitu njegu interijera, održavanje i čišćenje eksterijera,
                  profesionalno poliranje te pažljivo osmišljene pakete za one
                  koji žele kombinirati više usluga.
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
                  <strong>
                    Istražite našu ponudu i pronađite tretman koji najbolje
                    odgovara vašem vozilu.
                  </strong>
                </p>
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
      <Container className="pt-9!" id="service-list">
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
          transitionTo="opacity-100 md:delay-300 duration-1000"
          className={`w-full bg-gray-light/15 dark:bg-gray-dark/40 rounded-xs flex-col`}
          delay={300}
        >
          <div className="w-full flex flex-col md:flex-row">
            <Button
              variant="none"
              className={`max-w-none flex-1 items-center justify-center ${category === "all" ? "bg-light dark:bg-dark" : ""}`}
              onClick={() => setCategory("all")}
            >
              Sve usluge
            </Button>
            <Button
              variant="none"
              className={`max-w-none flex-1 items-center justify-center ${category === "eksterijer" ? "bg-light dark:bg-dark" : ""}`}
              onClick={() => setCategory("eksterijer")}
            >
              Eksterijer
            </Button>
            <Button
              variant="none"
              className={`max-w-none flex-1 items-center justify-center ${category === "interijer" ? "bg-light dark:bg-dark" : ""}`}
              onClick={() => setCategory("interijer")}
            >
              Interijer
            </Button>
            <Button
              variant="none"
              className={`max-w-none flex-1 items-center justify-center ${category === "poliranje_i_zastita" ? "bg-light dark:bg-dark" : ""}`}
              onClick={() => setCategory("poliranje_i_zastita")}
            >
              Poliranje i zaštita
            </Button>
            <Button
              variant="none"
              className={`max-w-none flex-1 items-center justify-center ${category === "posebni_paketi" ? "bg-light dark:bg-dark" : ""}`}
              onClick={() => setCategory("posebni_paketi")}
            >
              Posebni paketi
            </Button>
          </div>
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
          {displayServices.map((service, index) => {
            return (
              <Reveal
                key={`${service.slug}-${index}`}
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
