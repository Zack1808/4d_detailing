import React from "react";

import SEO from "@/shared/components/SEO";

import Container from "@/shared/components/Container";

const Dashboard: React.FC = () => {
  return (
    <main className="px-9 pt-9">
      <SEO title="4D Detailing | Admin Dashboard" />
      <h1 className="text-dark dark:text-light text-3xl font-semibold">
        Dobrodošao, Luka
      </h1>
      <Container>
        <h2 className="text-dark dark:text-light font-medium text-xl">
          Analitika
        </h2>
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
