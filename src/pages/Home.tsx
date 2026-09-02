import React from "react";

import Hero from "../components/layout/Hero";
import Tesseract from "../components/layout/Tessaract";

import Button from "../components/common/Button";

const Home: React.FC = () => {
  return (
    <main>
      <Hero className="relative overflow-hidden">
        <Tesseract
          width={2000}
          height={2000}
          className="absolute right-100 -z-50 opacity-15 pointer-events-none -translate-y-3/7 translate-x-1/2 rotate-z-180"
        />
        <h1 className="md:text-8xl text-5xl font-bold font-title text-secondary">
          4D Detailing
        </h1>
        <p className="text-2xl">Sjaj koji nadilazi vrijeme.</p>
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
