import React, { useEffect, useMemo } from "react";

import { useScrollPosition } from "../context/scrollContext";
import { useStore } from "../context/storeContext";

import transition from "../helpers/transition";

import { Header, PriceCard, Button, FadeImage } from "../components";

import "../css/pages/Services.css";

const Packages = () => {
  const { resetScroll } = useScrollPosition();

  const { packagesContent } = useStore();

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
      <Header
        title={packagesContent.title}
        bgImage={packagesContent.headerImg}
      />

      <main className="category">
        <article className="container">
          <section>
            <p>
              {packagesContent.content?.split(/\n/g).map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
            <Button primary link="/kontakt">
              Rezerviraj termin
            </Button>
          </section>
          <FadeImage
            src={packagesContent.contentImg}
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

export default Packages;
