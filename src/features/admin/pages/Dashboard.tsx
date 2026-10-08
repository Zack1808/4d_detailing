import React from "react";
import { FaArrowTrendUp, FaArrowRight } from "react-icons/fa6";

import SEO from "@/shared/components/SEO";
import Button from "@/shared/components/Button";

import Container from "@/shared/components/Container";

import CircularProgress from "@features/admin/components/CircularProgress";
import BarProgress from "@features/admin/components/BarProgress";

const Dashboard: React.FC = () => {
  return (
    <main className="md:px-9 flex-1">
      <SEO title="4D Detailing | Admin Dashboard" />

      <Container className="pb-0!">
        <h1 className="text-dark dark:text-light text-4xl font-semibold">
          Dobrodošao, Luka
        </h1>
      </Container>

      <Container className="pb-0!">
        <h2 className="text-dark dark:text-light font-semibold text-2xl">
          Analitika
        </h2>
        <div className="flex flex-col w-full gap-6">
          <div className="flex w-full lg:flex-row flex-col gap-3">
            <div className="flex flex-1 bg-gray-light/15 dark:bg-gray-dark/40 p-6 rounded-xs gap-6 flex-col justify-between">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-dark dark:text-light text-xl">Pregledi</h3>

                <small className="text-gray-500 dark:text-gray-400">
                  Zadnjih 30 dana
                </small>
              </div>
              <div className="flex gap-6">
                <div className="flex-1/5 flex flex-col gap-6 justify-center">
                  <p className="text-md text-gray-500 dark:text-gray-400 font-light flex flex-col text-sm">
                    Ukupno pregleda
                    <strong className="text-dark dark:text-light font-semibold text-5xl">
                      365
                    </strong>
                  </p>
                  <p className="text-dark dark:text-light text-sm">
                    <FaArrowTrendUp className="text-xl inline-block mr-3" />
                    {}
                    <strong>12%</strong> u odnosu na prethodno razdoblje
                  </p>
                </div>
                <CircularProgress
                  value={271}
                  max={365}
                  label="Novi posjetitelji"
                  className="flex-1 max-w-42"
                >
                  <span className="text-gray-500 dark:text-gray-400 text-xs flex flex-col">
                    <strong className="text-3xl text-dark dark:text-light">
                      {Math.round((271 / 365) * 100)}%
                    </strong>
                    Novih
                  </span>
                </CircularProgress>
              </div>
              <div className="flex gap-3 border-t border-gray-500 dark:border-gray-400 pt-6 ">
                <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1">
                  <span className="p-1.5 rounded-full bg-dark dark:bg-light aspect-square" />
                  Novi posjetitelji:{" "}
                  <strong className="text-dark dark:text-light">271</strong>
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1">
                  <span className="p-1.5 rounded-full bg-dark/20 dark:bg-light/20 aspect-square" />
                  Povratni:{" "}
                  <strong className="text-dark dark:text-light">94</strong>
                </p>
              </div>
            </div>
            <div className="flex flex-1 flex-col bg-gray-light/15 dark:bg-gray-dark/40 p-6 gap-6 rounded-xs">
              <div className="flex flex-1 items-baseline justify-between gap-3">
                <h3 className="text-dark dark:text-light text-xl">
                  Pregledi po stranicama
                </h3>

                <small className="text-gray-500 dark:text-gray-400">
                  Zadnjih 30 dana
                </small>
              </div>
              <div className="flex flex-col justify-between h-full gap-3">
                <BarProgress max={365} value={182} label="početna">
                  <div className="flex-1 flex justify-between mb-1 text-xs">
                    <p className="flex gap-3">
                      Početna{" "}
                      <span className="text-gray-500 dark:text-gray-400">
                        /
                      </span>
                    </p>
                    <p>
                      182{" "}
                      <span className="text-gray-500 dark:text-gray-400">
                        50%
                      </span>
                    </p>
                  </div>
                </BarProgress>
                <BarProgress max={365} value={102} label="početna">
                  <div className="flex-1 flex justify-between mb-1 text-xs">
                    <p className="flex gap-3">
                      Usluge{" "}
                      <span className="text-gray-500 dark:text-gray-400">
                        /usluge
                      </span>
                    </p>
                    <p>
                      102{" "}
                      <span className="text-gray-500 dark:text-gray-400">
                        28%
                      </span>
                    </p>
                  </div>
                </BarProgress>
                <BarProgress max={365} value={58} label="početna">
                  <div className="flex-1 flex justify-between mb-1 text-xs">
                    <p className="flex gap-3">
                      Kontakt{" "}
                      <span className="text-gray-500 dark:text-gray-400">
                        /kontakt
                      </span>
                    </p>
                    <p>
                      58{" "}
                      <span className="text-gray-500 dark:text-gray-400">
                        16%
                      </span>
                    </p>
                  </div>
                </BarProgress>
                <BarProgress max={365} value={12} label="početna">
                  <div className="flex-1 flex justify-between mb-1 text-xs">
                    <p className="flex gap-3">
                      Pravila privatnosti{" "}
                      <span className="text-gray-500 dark:text-gray-400">
                        /pravila-privatnosti
                      </span>
                    </p>
                    <p>
                      12{" "}
                      <span className="text-gray-500 dark:text-gray-400">
                        3%
                      </span>
                    </p>
                  </div>
                </BarProgress>
                <BarProgress max={365} value={11} label="početna">
                  <div className="flex-1 flex justify-between mb-1 text-xs">
                    <p className="flex gap-3">
                      Uvijeti korištenja{" "}
                      <span className="text-gray-500 dark:text-gray-400">
                        /uvijeti-koristenja
                      </span>
                    </p>
                    <p>
                      11{" "}
                      <span className="text-gray-500 dark:text-gray-400">
                        3%
                      </span>
                    </p>
                  </div>
                </BarProgress>
              </div>
              <div className="flex gap-3 border-t border-gray-500 dark:border-gray-400 pt-6 mt-auto justify-end">
                <Button to="/admin/analitika" className="p-0! text-sm!">
                  Vidi više <FaArrowRight />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container className="pb-0!">
        <h2 className="text-dark dark:text-light font-medium text-xl">
          Usluge
        </h2>
      </Container>

      <Container className="pb-0!">
        <h2 className="text-dark dark:text-light font-medium text-xl">
          Recenzije
        </h2>
      </Container>

      <Container className="pb-0!">
        <h2 className="text-dark dark:text-light font-medium text-xl">
          Termini
        </h2>
      </Container>
    </main>
  );
};

export default Dashboard;
