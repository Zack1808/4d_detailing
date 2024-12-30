import React, { useEffect, useMemo } from "react";

import { useScrollPosition } from "../context/scrollContext";

import transition from "../helpers/transition";

import { Header, PriceCard, Button, FadeImage } from "../components";

import "../css/pages/Services.css";

const Interior = () => {
  const { resetScroll } = useScrollPosition();

  const priceCards = useMemo(
    () => [
      {
        title: "Kemijsko čišćenje sjedala",
        price: "50",
        services: [
          "Kemijsko čišćenje vozačevog i suvozačevog sjedala",
          "Kemijsko čišćenje stražnjih putničkih sjedala",
          "Zaštita površina sjedala",
        ],
        info: "Cijena usluge se može mjenjati ovisno o veličini i zaprljanosti vozila.",
      },
      {
        title: "Kemijsko čišćenje unutrašnjosti",
        price: "90",
        services: [
          "Detaljno pranje eksterijera kao priprema",
          "Detaljno pranje naplataka",
          "Potpuno kemijsko čišćenje svih vidljivih površina osim krova",
          "Kemijsko čišćenje sjedala i podova",
          "Zaštita plastičnih i tekstilnih površina",
        ],
        info: "Cijena usluge može se mijenjati ovisno o veličini i zaprljanosti vozila.",
      },
      {
        title: "Full detailing interijera",
        price: "250",
        services: [
          "Detaljno pranje eksterijera kao priprema",
          "Detaljno pranje naplataka",
          "Demontaža sjedala",
          "Kompletno dubinsko čišćenje unutrašnjosti",
          "Čišćenje teško dostupnih mjesta, dlaka od ljubimaca i sličnih nečistoća",
          "Kemijsko čišćenje sjedala i podova",
          "Ponovna montaža sjedala",
          "Zaštita plastičnih i tekstilnih površina",
        ],
        priceSuv: "50",
        priceTransporter: "130",
        info: "Cijena usluge može se mijenjati ovisno o veličini i zaprljanosti vozila.",
      },
    ],
    []
  );

  useEffect(() => resetScroll(), []);

  return (
    <>
      <Header title="Čišćenje interijera" bgImage="/interjer.avif" />

      <main className="category">
        <article className="container">
          <section>
            <p>
              Čišćenje interijera često je teško i vremenski zahtjevan proces.
              Cijelom interijeru vozila, korištenjem posebnih namjenskih
              sredstava i alata, pružamo najbolje rezultate čišćenja, koji
              pritom nisu opasni za dijelove unutrašnjosti vašeg limenog
              ljubimca.
              <br />
              <br />U slučaju jačih zaprljanja, cijena usluge može porasti. Za
              dodatne informacije vezane uz cijenu slobodno nas kontaktirajte.
            </p>
            <Button primary link="/kontakt">
              Rezerviraj termin
            </Button>
          </section>
          <FadeImage
            src="/car-inside.avif"
            alt="placeholder-image-eksterijer"
          />
        </article>

        <article className="container category-prices">
          {priceCards.map((priceCard, index) => (
            <PriceCard {...priceCard} key={`price-card-${index + 1}`} />
          ))}
        </article>
      </main>
    </>
  );
};

export default transition(Interior);
