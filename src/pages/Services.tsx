import React, { useEffect, useMemo, useState } from "react";

import Container from "../components/layout/Container";

import Input from "../components/common/Input";
import ServiceCard from "../components/common/ServiceCard";
import Select from "../components/common/Select";

import { useData } from "../context/DataContext";

const SORTING_OPTIONS = [
  { value: "popular", label: "Popularno" },
  { value: "priceUp", label: "Cijena rastuća" },
  { value: "priceDown", label: "Cijena padajuća" },
  { value: "alphabetical", label: "Naziv A-Z" },
  { value: "timeUp", label: "Trajanje uzlazno" },
  { value: "timeDown", label: "Trajanje silazno" },
] as const;

const Services: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [sortValue, setSortValue] = useState<string | string[]>(["popular"]);

  const { services } = useData();

  const displayServices = useMemo(() => {
    let newList = [...services];
    const searchTerm = search.toLowerCase();

    newList = newList.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm) ||
        item.services.some((service) =>
          service.toLowerCase().includes(searchTerm),
        ) ||
        item.keywords.some((keyword) =>
          keyword.toLowerCase().includes(searchTerm),
        ),
    );

    return newList;
  }, [services, search]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <Container className="pb-3!" id="service-intro">
        <h2 className="text-4xl text-dark dark:text-light mt-30 font-bold">
          Naše usluge
        </h2>
        <p className="text-dark dark:text-light max-w-[85ch] mt-3">
          Svako vozilo ima svoje potrebe, a kvalitetna njega počinje pravim
          odabirom usluge. U 4D Detailingu zato nudimo različite tretmane kojima
          možemo osvježiti, obnoviti i zaštititi vaše vozilo – izvana i iznutra.
          <br />
          <br />
          Našu ponudu podijelili smo u četiri glavne kategorije: temeljitu njegu
          interijera, održavanje i čišćenje eksterijera, profesionalno poliranje
          te pažljivo osmišljene pakete za one koji žele kombinirati više
          usluga.
          <br />
          <br />
          Bez obzira želite li samo osvježiti izgled vozila, ukloniti tragove
          svakodnevnog korištenja ili mu pružiti kompletnu njegu, pronaći ćete
          opciju prilagođenu svojim potrebama.
          <br />
          <br />
          <strong>
            Istražite našu ponudu i pronađite tretman koji najbolje odgovara
            vašem vozilu.
          </strong>
        </p>
      </Container>
      <Container className="pt-9!">
        <p className="font-bold text-2xl text-dark dark:text-light">Filteri</p>
        <div className="p-3 w-full bg-gray-light/20 dark:bg-gray-dark/20 rounded-xs flex gap-3 md:flex-row flex-col">
          <div className="flex gap-3 md:items-center flex-3 md:flex-row flex-col">
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
            <ServiceCard item={service} key={`${service.title}-${index}`} />
          ))}
        </div>
      </Container>
    </main>
  );
};

export default Services;
