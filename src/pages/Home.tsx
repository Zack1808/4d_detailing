import React from "react";

import Hero from "../components/layout/Hero";
import Container from "../components/layout/Container";

import Button from "../components/common/Button";

import Tesseract from "../components/animated/Tessaract";

const Home: React.FC = () => {
  const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  return (
    <main className="relative overflow-hidden">
      <Tesseract
        size={1700}
        className="absolute md:right-80 right-0 -z-50 opacity-15 dark:opacity-35 pointer-events-none top-100 -translate-y-3/7 translate-x-1/2 rotate-z-180"
        thickness={5}
        speed={70}
        isDark={darkMode}
      />
      <Hero>
        <h1 className="md:text-8xl text-5xl font-bold  text-dark dark:text-light">
          4D Detailing
        </h1>
        <p className="text-2xl text-dark dark:text-light">
          Sjaj koji nadilazi vrijeme.
        </p>
        <div className="flex sm:flex-row flex-col gap-2 mt-10">
          <Button variant="primary">Pregledaj usluge</Button>
          <Button variant="secondary" to="/kontakt">
            Rezerviraj termin
          </Button>
        </div>
      </Hero>

      <Container id="services">
        <h2 className="font-bold text-3xl text-dark dark:text-light">
          Naše usluge
        </h2>
      </Container>

      <Container id="about">
        <h2 className="font-bold text-3xl text-dark dark:text-light">
          Naša misija
        </h2>
      </Container>

      <Container id="reviews">
        <h2 className="font-bold text-3xl text-dark dark:text-light">
          Što kažu naši klijenti?
        </h2>
      </Container>
      <Container id="forward-contact"></Container>
    </main>
  );
};

export default Home;
