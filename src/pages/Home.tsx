import React from "react";

import Hero from "../components/layout/Hero";

import Button from "../components/common/Button";

const Home: React.FC = () => {
  return (
    <main>
      <Hero>
        <h1 className="md:text-6xl text-5xl font-bold font-title text-secondary">
          4D Detailing
        </h1>
        <p className="text-xl">Sjaj koji nadilazi vrijeme.</p>
        <div className="flex gap-2 mt-10">
          <Button variant="primary">Pregledaj usluge</Button>
          <Button variant="secondary" to="/kontakt">
            Kontaktirajte nas
          </Button>
        </div>
      </Hero>
    </main>
  );
};

export default Home;
