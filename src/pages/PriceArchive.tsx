import { useMemo, useState } from "react";
import { FaDownload } from "react-icons/fa6";

import SEO from "../components/seo/SEO";
import Container from "../components/layout/Container";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { InlineError } from "../components/ui/InlineMessage";
import Reveal from "../components/ui/Reveal";
import Select from "../components/ui/Select";
import { PageTitle, Paragraph, SubTitle } from "../components/ui/Typography";

import { PAGE_META } from "../config/seo";
import { PATHS } from "../config/paths";
import { useData } from "../context/DataContext";
import { useFileDownload } from "../hooks/useFileDownload";
import { formatDateValue, getTime } from "../utils/date";
import { normalizeText } from "../utils/text";

import type { PriceTableType } from "../types/data";

const SORTING_OPTIONS = [
  { value: "najnovije", label: "Najnovije" },
  { value: "najstarije", label: "Najstarije" },
  { value: "abecedno", label: "Naziv A-Z" },
];

const HEADERS = ["Naziv", "Datum izrade", "Status"];

const sortTables = (list: PriceTableType[], sort: string) =>
  [...list].sort((a, b) => {
    switch (sort) {
      case "najstarije":
        return getTime(a.createdAt) - getTime(b.createdAt);
      case "abecedno":
        return a.name.localeCompare(b.name, "hr");
      default:
        return getTime(b.createdAt) - getTime(a.createdAt);
    }
  });

const PriceArchive = () => {
  const { priceArchive, status, error, reload } = useData();
  const { activeKey, download } = useFileDownload();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("najnovije");

  const tables = useMemo(() => {
    const term = normalizeText(search);

    return sortTables(
      priceArchive.filter(
        (item) =>
          normalizeText(item.name).includes(term) ||
          formatDateValue(item.createdAt).includes(term),
      ),
      sort,
    );
  }, [priceArchive, search, sort]);

  return (
    <main className="overflow-hidden">
      <SEO {...PAGE_META.priceArchive} />

      <Container className="pb-3!">
        <Reveal variant="left">
          <PageTitle>Arhiva cjenika</PageTitle>
        </Reveal>
        <Reveal variant="left" delay={200}>
          <Paragraph className="mt-3">
            Ovdje možete pregledati i preuzeti starije verzije našeg cjenika.
            Aktualni cjenik označen je oznakom{" "}
            <strong className="font-semibold">Aktualni</strong>.
          </Paragraph>
        </Reveal>
        <Reveal variant="left" delay={300} className="mt-6">
          <Button variant="secondary" to={PATHS.services}>
            Natrag na usluge
          </Button>
        </Reveal>
      </Container>

      <Container className="pt-9!">
        <Reveal variant="left" delay={200}>
          <SubTitle>Cjenici</SubTitle>
        </Reveal>

        <Reveal
          variant="fade"
          delay={300}
          className="surface flex w-full flex-col gap-3 p-3 md:flex-row"
        >
          <div className="flex flex-1/3 flex-col gap-3 md:flex-row md:items-center">
            <Input
              type="search"
              aria-label="Pretraži cjenike"
              placeholder="Pretraži po nazivu ili datumu..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
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
              onChange={setSort}
            />
          </div>
        </Reveal>

        {status === "error" ? (
          <InlineError
            message={`Cjenike trenutno nije moguće učitati. ${error ?? ""}`}
            onRetry={reload}
          />
        ) : (
          <Reveal
            variant="fade"
            delay={400}
            threshold={0.01}
            className="w-full overflow-x-auto"
          >
            <table className="w-full min-w-140 border-collapse text-left">
              <thead>
                <tr className="bg-gray-light/15 dark:bg-gray-dark/40">
                  {HEADERS.map((header) => (
                    <th
                      key={header}
                      scope="col"
                      className="px-4 py-3 text-sm font-semibold tracking-wide uppercase"
                    >
                      {header}
                    </th>
                  ))}
                  <th scope="col" className="relative px-4 py-3 text-right">
                    <span className="sr-only">Preuzmi</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tables.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-light/30 transition hover:bg-gray-light/10 dark:border-gray-semidark dark:hover:bg-gray-dark/30"
                  >
                    <td className="px-4 py-4 font-medium">{item.name}</td>
                    <td className="px-4 py-4 font-light whitespace-nowrap">
                      {formatDateValue(item.createdAt)}
                    </td>
                    <td className="px-4 py-4">
                      {item.isCurrent ? (
                        <span className="inline-block rounded-xs bg-dark px-2 py-1 text-xs font-semibold text-light dark:bg-light dark:text-dark">
                          Aktualni
                        </span>
                      ) : (
                        <span className="inline-block rounded-xs border border-gray-light px-2 py-1 text-xs font-medium text-gray-light">
                          Arhiviran
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      <Button
                        variant="secondary"
                        className="ml-auto text-sm"
                        loading={activeKey === item.id}
                        disabled={activeKey !== null}
                        onClick={() =>
                          download(item.id, item.downloadLink, item.name)
                        }
                        aria-label={`Preuzmi ${item.name}`}
                      >
                        <FaDownload aria-hidden="true" />
                        <span className="hidden sm:inline">Preuzmi</span>
                      </Button>
                    </td>
                  </tr>
                ))}
                {tables.length === 0 && (
                  <tr>
                    <td
                      colSpan={HEADERS.length + 1}
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
        )}
      </Container>
    </main>
  );
};

export default PriceArchive;
