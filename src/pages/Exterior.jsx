import React, { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

import { useScrollPosition } from "../context/scrollContext";

import transition from "../helpers/transition";

import { Header, PriceCard, Button } from "../components";

import "../css/pages/Services.css";

const Exterior = () => {
  const { resetScroll } = useScrollPosition();

  const [imageRef, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const priceCards = useMemo(
    () => [
      {
        title: "Vanjsko pranje",
        price: "15",
        services: [
          "Detaljno pranje eksterijera",
          "Usisavanje interijera",
          "Brisanje prašine s interijera",
        ],
        info: "Cijena usluge se može mijenjati ovisno o veličini i zaprljanosti vozila.",
      },
      {
        title: "Vanjsko pranje, uključujući naplatke.",
        price: "20",
        services: [
          "Detaljno pranje eksterijera",
          "Detaljno pranje naplataka",
          "Usisavanje interijera",
          "Brisanje prašine interijera",
        ],
        info: "Cijena usluge može se mijenjati ovisno o veličini i zaprljanosti vozila.",
      },
      {
        title: "Premium čišćenje vozila",
        price: "35",
        services: [
          "Detaljno pranje eksterijera",
          "Detaljno pranje naplataka",
          "Detaljno pranje interijera bez kemijskog čišćenja tekstilnih površina i krova",
        ],
        priceSuv: "10",
        priceTransporter: "30",
        info: "Cijena usluge može se mijenjati ovisno o veličini i zaprljanosti vozila.",
      },
      {
        title: "Pranje motornog prostora",
        price: "40",
        services: [
          "Pretpranje aktivnom pjenom",
          "Odmašćivanje površina motornog prostora",
          "Detaljno pranje površina motornog prostora",
          "Ispiranje i sušenje motornog prostora",
          "Zaštitni premaz",
        ],
      },
    ],
    []
  );

  useEffect(() => resetScroll(), []);

  return (
    <div className="page-container">
      <Header title="Čišćenje eksterijera" bgImage="/eksterijer.avif" />

      <main className="category">
        <article className="container">
          <section>
            <p>
              Poznata je činjenica da automatske autopraonice s četkama nisu
              najbolje rješenje za čistoću vašeg vozila. Štoviše, često uzrokuju
              oštećenja ili nezadovoljavajuće rezultate pranja. Kod nas možete
              dovesti vozilo na sigurno i detaljno pranje koje neće oštetiti
              boju niti ostaviti nečistoće na dijelovima vašeg vozila. Koristimo
              profesionalna i provjerena sredstva i metode kako bismo osigurali
              samo najbolje rezultate pranja.
              <br />
              <br />
              Za dodatne informacije slobodno nam se javite.
            </p>
            <Button primary link="/kontakt">
              Rezerviraj termin
            </Button>
          </section>
          <img
            ref={imageRef}
            className={inView ? "image-pop" : ""}
            src="https://images.unsplash.com/photo-1527581849771-416a9d62308e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            srcSet="https://images.unsplash.com/photo-1527581849771-416a9d62308e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 480w, https://images.unsplash.com/photo-1527581849771-416a9d62308e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 800w, https://images.unsplash.com/photo-1527581849771-416a9d62308e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 1200w"
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

export default transition(Exterior);
