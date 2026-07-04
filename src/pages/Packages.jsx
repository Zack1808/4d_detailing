import React, { useEffect, useMemo } from "react";

import { useScrollPosition } from "../context/scrollContext";
import { useStore } from "../context/storeContext";

import { Header, PriceCard, Button, FadeImage } from "../components";

import "../css/pages/Services.css";

const Packages = React.memo(() => {
  const { resetScroll } = useScrollPosition();

  const { packagesList } = useStore();

  useEffect(() => {
    const link = document.createElement("link");
    const meta = document.createElement("meta");

    link.rel = "canonical";
    link.href = "https://4d-detailing.hr/posebni-paketi";
    document.head.appendChild(link);

    meta.setAttribute("property", "og:url");
    meta.content = "https://4d-detailing.hr/posebni-paketi";
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(meta);
      resetScroll();
    };
  }, []);

  return (
    <>
      <Header title="Posebni paketi" fallbackImage="/packages.avif" />

      <main className="category">
        <article className="container">
          <section>
            <p>
              Cijenjeni korisnici, za Vas smo pripremili i par posebnih paketa
              usluga. Oni su spoj nekoliko naših pojedinačnih ponuda iz sva tri
              područja njege vozila. Ovi paketi su posebno prigodni za korisnike
              koji po prvi puta žele njegu svog vozila dati u naše ruke kako bi
              se lakše odlučili na uslugu. Također za korisnike koji žele
              redovito kod nas održavati vozilo ovi paketi su odlična priprema
              za program održavanja.
              <br />
              <br />
              Cijene paketa ovise isključivo o veličini vozila. Slobodno nam se
              javite s dodatnim pitanjima!
            </p>
            <Button primary link="/kontakt">
              Rezerviraj termin
            </Button>
          </section>
          <FadeImage
            alt="placeholder-image-eksterijer"
            fallbackImage="https://images.unsplash.com/photo-1614687154052-e05046c3feec?q=80&w=2008&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </article>

        <article className="container category-prices">
          {packagesList?.map((priceCard) => (
            <PriceCard {...priceCard} key={priceCard.id} />
          ))}
        </article>
      </main>
    </>
  );
});

export default Packages;
