import React, { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

import { useScrollPosition } from "../context/scrollContext";

import transition from "../helpers/transition";

import { Header, PriceCard, Button } from "../components";

import "../css/pages/Services.css";

const Interior = () => {
  const { resetScroll } = useScrollPosition();

  const [imageRef, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

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
    <div className="page-container">
      <Header title="Čišćenje interijera" bgImage="/Interjer.avif" />

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
          <img
            ref={imageRef}
            className={inView ? "image-pop" : ""}
            src="https://images.unsplash.com/photo-1601362840138-44bca7a80305?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            srcSet="https://images.unsplash.com/photo-1601362840138-44bca7a80305?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 480w, https://images.unsplash.com/photo-1601362840138-44bca7a80305?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 800w, https://images.unsplash.com/photo-1601362840138-44bca7a80305?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 1200w"
            alt="placeholder-image-eksterijer"
          />
        </article>

        <article className="container category-prices">
          {priceCards.map((priceCard, index) => (
            <PriceCard {...priceCard} key={`price-card-${index + 1}`} />
          ))}
        </article>
      </main>
    </div>
  );
};

export default transition(Interior);
