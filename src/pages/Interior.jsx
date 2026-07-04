import React, { useEffect, useMemo } from "react";

import { useScrollPosition } from "../context/scrollContext";
import { useStore } from "../context/storeContext";

import { Header, PriceCard, Button, FadeImage } from "../components";

import "../css/pages/Services.css";

const Interior = React.memo(() => {
  const { resetScroll } = useScrollPosition();

  const { interiorList } = useStore();

  useEffect(() => {
    const link = document.createElement("link");
    const meta = document.createElement("meta");

    link.rel = "canonical";
    link.href = "https://4d-detailing.hr/čišćenje-interijera";
    document.head.appendChild(link);

    meta.setAttribute("property", "og:url");
    meta.content = "https://4d-detailing.hr/čišćenje-interijera";
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(meta);
      resetScroll();
    };
  }, []);

  return (
    <>
      <Header title="Čišćenje interijera" fallbackImage="/interjer.avif" />

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
          <FadeImage alt="Slika interijera" fallbackImage="/car-inside.avif" />
        </article>

        <article className="container category-prices">
          {interiorList?.map((priceCard) => (
            <PriceCard {...priceCard} key={priceCard.id} />
          ))}
        </article>
      </main>
    </>
  );
});

export default Interior;
