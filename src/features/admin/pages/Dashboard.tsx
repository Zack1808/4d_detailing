import React from "react";
import { FaArrowTrendUp } from "react-icons/fa6";

import SEO from "@/shared/components/SEO";

import Container from "@/shared/components/Container";

import CircularProgress from "../components/CircularProgress";

const Dashboard: React.FC = () => {
  return (
    <main className="px-9 flex-1">
      <SEO title="4D Detailing | Admin Dashboard" />

      <Container>
        <h1 className="text-dark dark:text-light text-3xl font-semibold">
          Dobrodošao, Luka
        </h1>
      </Container>

      <Container>
        <div className="flex flex-col w-full">
          <div className="flex w-full gap-3 flex-wrap">
            <div className="flex flex-1 bg-gray-light/15 dark:bg-gray-dark/40 p-6 rounded-xs gap-6 flex-col">
              <div className="flex flex-1 items-baseline justify-between gap-3">
                <h2 className="text-dark dark:text-light text-2xl">
                  Pregledi stranice
                </h2>

                <small className="text-gray-500 dark:text-gray-400">
                  Zadnjih 30 dana
                </small>
              </div>
              <div className="flex gap-6 border-b border-gray-500 dark:border-gray-400 pb-6">
                <div className="flex-1/5 flex flex-col gap-6">
                  <p className="text-md text-gray-500 dark:text-gray-400 font-light flex flex-col">
                    Posjetitelji
                    <strong className="text-dark dark:text-light font-semibold text-5xl">
                      365
                    </strong>
                  </p>
                  <p className="text-dark dark:text-light text-sm">
                    <FaArrowTrendUp className="text-xl inline-block" /> 12% u
                    odnosu na prethodno razdoblje
                  </p>
                </div>
                <CircularProgress
                  value={271}
                  max={365}
                  label="Novi posjetitelji"
                  className="flex-1"
                >
                  <span className="text-gray-500 dark:text-gray-400 text-xs flex flex-col">
                    <strong className="text-3xl text-dark dark:text-light">
                      {Math.round((271 / 365) * 100)}%
                    </strong>
                    Novih
                  </span>
                </CircularProgress>
              </div>
              <div className="flex gap-3">
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Novi posjetitelji:{" "}
                  <strong className="text-dark dark:text-light">271</strong>
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Povratni:{" "}
                  <strong className="text-dark dark:text-light">94</strong>
                </p>
              </div>
            </div>
            <div className="flex flex-1 bg-gray-light/15 dark:bg-gray-dark/40 p-3 rounded-xs"></div>
            <div className="flex flex-1 bg-gray-light/15 dark:bg-gray-dark/40 p-3 rounded-xs"></div>
          </div>
        </div>
      </Container>

      <Container>
        <h2 className="text-dark dark:text-light font-medium text-xl">
          Usluge
        </h2>
      </Container>

      <Container>
        <h2 className="text-dark dark:text-light font-medium text-xl">
          Recenzije
        </h2>
      </Container>

      <Container>
        <h2 className="text-dark dark:text-light font-medium text-xl">
          Termini
        </h2>
      </Container>
    </main>
  );
};

export default Dashboard;
