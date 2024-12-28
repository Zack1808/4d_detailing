import React, { useEffect, useMemo } from "react";

import { useScrollPosition } from "../context/scrollContext";

import transition from "../helpers/transition";

import { Header, PriceCard, Button, FadeImage } from "../components";

import "../css/pages/Services.css";

const Exterior = () => {
  const { resetScroll } = useScrollPosition();

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
          <FadeImage src="/washing.avif" alt="placeholder-image-eksterijer" />
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
