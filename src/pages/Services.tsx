import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { type ServiceDataType } from "../types/data";

import Container from "../components/layout/Container";
import ImageCarousel from "../components/layout/ImageCarousel";

import Input from "../components/common/Input";
import ServiceCard from "../components/common/ServiceCard";
import Select from "../components/common/Select";
import Button from "../components/common/Button";

import { useData } from "../context/DataContext";

type Category =
  | "all"
  | "interijer"
  | "eksterijer"
  | "poliranje_i_zastita"
  | "posebni_paketi";

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
  "/images/service1.jpg",
  "/images/service2.jpg",
  "/images/service3.jpg",
  "/images/service4.jpg",
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

  const { services } = useData();

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
      key: keyof ServiceDataType,
      direction: "asc" | "desc",
    ) => {
      const multiplier = direction === "asc" ? 1 : -1;

      return [...list].sort((a, b) => {
        switch (key) {
          case "priceFrom":
            return (a.priceFrom - b.priceFrom) * multiplier;

          case "isFeatured":
            return (Number(a.isFeatured) - Number(b.isFeatured)) * multiplier;

          case "title":
            return a.title.localeCompare(b.title) * multiplier;

          case "duration":
            const durationA = parseDuration(a.duration);
            const durationB = parseDuration(b.duration);
            return (
              (durationA.min - durationB.min) * multiplier ||
              (durationA.max - durationB.max) * multiplier
            );

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
    <main>
      <Container className="pb-3!" id="service-intro">
        <div className="flex gap-3 justify-between">
          <div className="flex flex-col gap-6">
            <h2 className="text-4xl text-dark dark:text-light mt-30 font-bold">
              Naše usluge
            </h2>
            <p className="text-dark dark:text-light max-w-[85ch] mt-3">
              Svako vozilo ima svoje potrebe, a kvalitetna njega počinje pravim
              odabirom usluge. U 4D Detailingu zato nudimo različite tretmane
              kojima možemo osvježiti, obnoviti i zaštititi vaše vozilo – izvana
              i iznutra.
              <br />
              <br />
              Našu ponudu podijelili smo u četiri glavne kategorije: temeljitu
              njegu interijera, održavanje i čišćenje eksterijera, profesionalno
              poliranje te pažljivo osmišljene pakete za one koji žele
              kombinirati više usluga.
              <br />
              <br />
              Bez obzira želite li samo osvježiti izgled vozila, ukloniti
              tragove svakodnevnog korištenja ili mu pružiti kompletnu njegu,
              pronaći ćete opciju prilagođenu svojim potrebama.
              <br />
              <br />
              <strong>
                Istražite našu ponudu i pronađite tretman koji najbolje odgovara
                vašem vozilu.
              </strong>
            </p>
          </div>
          <div className="md:w-5/12 hidden 2xl:flex mt-30">
            <ImageCarousel images={IMAGES_CAROUSEL} />
          </div>
        </div>
      </Container>
      <Container className="pt-9!" id="service-list">
        <h3 className="font-bold text-2xl text-dark dark:text-light">Usluge</h3>

        <div className="w-full bg-gray-light/20 dark:bg-gray-dark/20 rounded-xs flex-col">
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
        </div>

        <div className="p-3 w-full bg-gray-light/20 dark:bg-gray-dark/20 rounded-xs flex gap-3 md:flex-row flex-col">
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
              className="text-dark dark:text-light font-semibold"
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
        </div>

        <div className="w-full grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1  gap-3 ">
          {displayServices.map((service, index) => (
            <ServiceCard item={service} key={`${service.slug}-${index}`} />
          ))}
        </div>
      </Container>
    </main>
  );
};

export default Services;
