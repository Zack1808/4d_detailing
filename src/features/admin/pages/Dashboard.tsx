import React from "react";

import SEO from "@/shared/components/SEO";

import Container from "@/shared/components/Container";

import CircularProgress from "../components/CircularProgress";

const Dashboard: React.FC = () => {
  return (
    <main className="px-9">
      <SEO title="4D Detailing | Admin Dashboard" />

      <Container>
        <h1 className="text-dark dark:text-light text-3xl font-semibold">
          Dobrodošao, Luka
        </h1>
        <CircularProgress value={365} max={365} label="test" />
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
