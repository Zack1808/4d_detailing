import React, { useEffect, useMemo, useState } from "react";

import { FaDownload } from "react-icons/fa6";

import type { PriceTableType } from "../types/data";

import Container from "../components/layout/Container";
import Reveal from "../components/layout/Reveal";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Select from "../components/common/Select";
import SEO from "../components/common/SEO";

import { useData } from "../context/DataContext";

import { downloadFile } from "../utils/download";
import { notifyError } from "../utils/toast";

const SORTING_OPTIONS = [
  { value: "najnovije", label: "Najnovije" },
  { value: "najstarije", label: "Najstarije" },
  { value: "abecedno", label: "Naziv A-Z" },
];

const formatDate = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleDateString("hr-HR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const getTime = (value: string) => {
  const time = new Date(value).getTime();

  return Number.isNaN(time) ? 0 : time;
};

const HEADERS = [
  { label: "Naziv", className: "" },
  { label: "Datum izrade", className: "" },
  { label: "Status", className: "" },
  { label: "", className: "text-right" },
];

const PriceArchive: React.FC = () => {
  const { priceArchive } = useData();

  const [search, setSearch] = useState<string>("");
  const [sortValue, setSortValue] = useState<string | string[]>("najnovije");
  const [downloading, setDownloading] = useState<string | null>(null);

  const displayTables = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    const list = priceArchive.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm) ||
        formatDate(item.createdAt).includes(searchTerm),
    );

    return list.sort((a, b) => {
      switch (sortValue) {
        case "najstarije":
          return getTime(a.createdAt) - getTime(b.createdAt);
        case "abecedno":
          return a.name.localeCompare(b.name, "hr");
        default:
          return getTime(b.createdAt) - getTime(a.createdAt);
      }
    });
  }, [priceArchive, search, sortValue]);

  const handleDownload = async (item: PriceTableType) => {
    setDownloading(item.downloadLink);

    try {
      await downloadFile(item.downloadLink, item.name);
    } catch (err: unknown) {
      console.error("downloadFile failed: ", err);
      notifyError("Preuzimanje nije uspjelo. Pokušajte ponovno.");
    } finally {
      setDownloading(null);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="overflow-hidden">
      <SEO
        title="Arhiva cjenika | 4D Detailing"
        canonical="https://4d-detailing.hr/arhiva-cijenika"
      />

      <Container className="pb-3!" id="price-archive-intro">
        <Reveal
          transitionFrom="opacity-0 -translate-x-6"
          transitionTo="opacity-100 translate-x-0"
        >
          <h2 className="text-4xl text-dark dark:text-light mt-30 font-bold">
            Arhiva cjenika
          </h2>
        </Reveal>
        <Reveal
          transitionFrom="opacity-0 -translate-x-6"
          transitionTo="opacity-100 translate-x-0"
          delay={200}
        >
          <p className="text-dark dark:text-light max-w-[85ch] mt-3 font-light">
            Ovdje možete pregledati i preuzeti starije verzije našeg cjenika.
            Aktualni cjenik označen je oznakom{" "}
            <strong className="font-semibold">Aktualni</strong>.
          </p>
        </Reveal>
        <Reveal
          transitionFrom="opacity-0 -translate-x-6"
          transitionTo="opacity-100 translate-x-0"
          delay={300}
          className="mt-6"
        >
          <Button variant="secondary" to="/usluge">
            Natrag na usluge
          </Button>
        </Reveal>
      </Container>

      <Container className="pt-9!" id="price-archive-table">
        <Reveal
          transitionFrom="opacity-0 -translate-x-6"
          transitionTo="opacity-100 translate-x-0"
          delay={200}
        >
          <h3 className="font-semibold text-2xl text-dark dark:text-light">
            Cjenici
          </h3>
        </Reveal>

        <Reveal
          transitionFrom="opacity-0"
          transitionTo="opacity-100 duration-1000"
          className="p-3 w-full bg-gray-light/15 dark:bg-gray-dark/40 rounded-xs flex gap-3 md:flex-row flex-col"
          delay={300}
        >
          <div className="flex gap-3 md:items-center flex-1/3 md:flex-row flex-col">
            <Input
              placeholder="Pretraži po nazivu ili datumu..."
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
          className="w-full overflow-x-auto"
          delay={400}
          threshold={0.01}
        >
          <table className="w-full min-w-140 text-left text-dark dark:text-light border-collapse">
            <thead>
              <tr className="bg-gray-light/15 dark:bg-gray-dark/40">
                {HEADERS.map((header, index) => (
                  <th
                    key={index}
                    scope="col"
                    className={`px-4 py-3 font-semibold text-sm uppercase tracking-wide ${header.className}`}
                  >
                    {header.label}
                    {!header.label && <span className="sr-only">Preuzmi</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayTables.map((item) => (
                <tr
                  key={`${item.name}-${item.createdAt}`}
                  className="border-b border-gray-light/30 dark:border-gray-semidark hover:bg-gray-light/10 dark:hover:bg-gray-dark/30 transition"
                >
                  <td className="px-4 py-4 font-medium">{item.name}</td>
                  <td className="px-4 py-4 font-light whitespace-nowrap">
                    {formatDate(item.createdAt)}
                  </td>
                  <td className="px-4 py-4">
                    {item.isCurrent ? (
                      <span className="inline-block rounded-xs px-2 py-1 text-xs font-semibold bg-dark text-light dark:bg-light dark:text-dark">
                        Aktualni
                      </span>
                    ) : (
                      <span className="inline-block rounded-xs px-2 py-1 text-xs font-medium border border-gray-light text-gray-light">
                        Arhiviran
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <Button
                      variant="secondary"
                      className="ml-auto text-sm"
                      loading={downloading === item.downloadLink}
                      disabled={downloading !== null}
                      onClick={() => handleDownload(item)}
                      aria-label={`Preuzmi ${item.name}`}
                    >
                      <FaDownload />
                      <span className="hidden sm:inline">Preuzmi</span>
                    </Button>
                  </td>
                </tr>
              ))}
              {displayTables.length === 0 && (
                <tr>
                  <td
                    colSpan={HEADERS.length}
                    className="px-4 py-9 text-center font-light"
                  >
                    {priceArchive.length === 0
                      ? "Trenutno nema arhiviranih cjenika."
                      : "Nema cjenika koji odgovaraju pretrazi."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Reveal>
      </Container>
    </main>
  );
};

export default PriceArchive;
