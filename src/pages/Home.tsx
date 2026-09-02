import React from "react";

import Hero from "../components/layout/Hero";
import Tesseract from "../components/layout/Tessaract";
import Container from "../components/layout/Container";

import Button from "../components/common/Button";

const Home: React.FC = () => {
  return (
    <main className="relative overflow-hidden">
      <Tesseract
        width={1700}
        height={1700}
        className="absolute md:right-80 right-0 -z-50 opacity-15 pointer-events-none top-100 -translate-y-3/7 translate-x-1/2 rotate-z-180"
      />
      <Hero>
        <h1 className="md:text-8xl text-5xl font-bold  text-dark">
          4D Detailing
        </h1>
        <p className="text-2xl text-dark">Sjaj koji nadilazi vrijeme.</p>
        <div className="flex sm:flex-row flex-col gap-2 mt-10">
          <Button variant="primary">Pregledaj usluge</Button>
          <Button variant="secondary" to="/kontakt">
            Rezerviraj termin
          </Button>
        </div>
      </Hero>
      <Container id="services"></Container>
      <Container id="about"></Container>
      <Container id="reviews"></Container>
      <Container id="forward-contact"></Container>
    </main>
  );
};

export default Home;
