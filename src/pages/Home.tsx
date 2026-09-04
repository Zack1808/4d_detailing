import React from "react";

import Hero from "../components/layout/Hero";
import Container from "../components/layout/Container";

import Button from "../components/common/Button";
import Card from "../components/common/Card";

import Tesseract from "../components/animated/Tessaract";

import { useData } from "../context/DataContext";

const Home: React.FC = () => {
  const { isDark, services } = useData();

  return (
    <main className="relative overflow-hidden">
      <Tesseract
        size={1700}
        className="absolute md:right-80 right-0 -z-50 opacity-15 pointer-events-none top-100 -translate-y-3/7 translate-x-1/2 rotate-z-180"
        thickness={5}
        speed={70}
        isDark={isDark}
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

      <Container id="services" className="bg-light dark:bg-dark pt-40! ">
        <h2 className="font-bold text-4xl text-dark dark:text-light">
          Naše najpopularnije usluge
        </h2>
        <p className="text-dark dark:text-light max-w-[75ch] mt-3">
          Odaberite jednu od naših najtraženijih usluga i priuštite svom vozilu
          temeljito čišćenje, obnovu i zaštitu. Izdvojili smo 3 paketa koje naši
          klijenti najčešće biraju.
        </p>

        <div className="w-full grid lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
          {services.map((service) => (
            <Card item={service} />
          ))}
        </div>

        <div className="flex w-full md:flex-row flex-col items-baseline-last gap-6 mt-3 justify-between">
          <div className="flex flex-col gap-3">
            <h5 className="text-dark dark:text-light text-xl font-bold">
              Ne znate koja je usluga najbolja za vaše vozilo?
            </h5>
            <p className="text-dark dark:text-light max-w-[75ch]">
              Pogledajte kompletnu ponudu i pronađite paket koji vam odgovara.
            </p>
          </div>

          <Button variant="secondary" to="/usluge">
            Pregledajte sve usluge
          </Button>
        </div>
      </Container>

      <Container id="about">
        <h2 className="font-bold text-4xl text-dark dark:text-light">
          Naša misija
        </h2>
        <p className="text-dark dark:text-light max-w-[75ch] mt-3">
          4D Detailing nastao je iz ljubavi prema automobilima i želje da tu
          strast pretvorimo u vrhunsku uslugu.
          <br />
          Vjerujemo da svako vozilo zaslužuje pažnju, kvalitetnu njegu i
          profesionalan pristup. Zato pružamo detailing usluge koje ne
          podrazumijevaju samo čišćenje, već brigu o svakom detalju – od izgleda
          i sjaja do dugotrajne zaštite.
          <br />
          Bilo da ste zaljubljenik u automobile ili jednostavno želite da vaše
          vozilo izgleda i bude očuvano kao prvog dana, mi smo tu da se
          pobrinemo za njega.
          <br />
          <br />
          Profesionalna njega nije trošak. To je ulaganje u vaše vozilo.
        </p>

        {/* TODO: Add desaturated image of the owner on the side  */}
      </Container>

      <Container id="reviews">
        <h2 className="font-bold text-4xl text-dark dark:text-light">
          Što kažu naši klijenti?
        </h2>
      </Container>

      <Container id="forward-contact"></Container>
    </main>
  );
};

export default Home;
