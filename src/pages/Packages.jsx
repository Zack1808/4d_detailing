import React, { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

import { useScrollPosition } from "../context/scrollContext";

import transition from "../helpers/transition";

import { Header, PriceCard, Button } from "../components";

import "../css/pages/Services.css";

const Packages = () => {
  const { resetScroll } = useScrollPosition();

  const [imageRef, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const priceCards = useMemo(
    () => [
      {
        title: "Paket Refresh",
        price: "200\t-\t350",
        services: [
          "Kemijsko čišćenje unutrašnjosti",
          "Detaljno pranje eksterijera",
          "Detaljno pranje naplataka",
          "Jednoslojno poliranje",
          "Zaštita keramičkim voskom",
          "Točkanje oštećenja od kamenčića (klijent sam nosi boju)",
        ],
        info: "Napomena: Po želji klijenta moguće je izraditi i slike za prodaju vozila (gratis). Cijena usluge može se mijenjati ovisno o veličini vozila.",
      },
      {
        title: "Paket Novo vozilo",
        price: "500\t-\t750",
        services: [
          "Detaljno pranje eksterijera",
          "Detaljno pranje naplataka",
          "Full detailing interijera",
          "Troslojno poliranje",
          "Zaštita sintetičkim premazom u trajanju od 6 mjeseci",
          "Zatočkavanje oštećenja od kamenčića (klijent sam donosi boju)",
        ],
        info: "Cijena usluge može se mijenjati ovisno o veličini vozila.",
      },
    ],
    []
  );

  useEffect(() => resetScroll(), []);

  return (
    <div className="page-container">
      <Header title="Posebni paketi" bgImage="/hero-bg-big.avif" />

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
          <img
            ref={imageRef}
            className={inView ? "image-pop" : ""}
            src="https://images.unsplash.com/photo-1614687154052-e05046c3feec?q=80&w=2008&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            srcSet="https://images.unsplash.com/photo-1614687154052-e05046c3feec?q=80&w=2008&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 480w, https://images.unsplash.com/photo-1614687154052-e05046c3feec?q=80&w=2008&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 800w, https://images.unsplash.com/photo-1614687154052-e05046c3feec?q=80&w=2008&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 1200w"
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

export default transition(Packages);
