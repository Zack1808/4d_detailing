import React, { useEffect, useMemo } from "react";

import { useScrollPosition } from "../context/scrollContext";
import { useStore } from "../context/storeContext";

import transition from "../helpers/transition";

import { Header, PriceCard, Button, FadeImage } from "../components";

import "../css/pages/Services.css";

const Polishing = () => {
  const { resetScroll } = useScrollPosition();

  const { polishContent } = useStore();

  const priceCards = useMemo(
    () => [
      {
        title: "Poliranje farova",
        price: "30",
        services: [
          "Brušenje i poliranje",
          "Dodavanje zaštitnog premaza i boost premaza",
        ],
        info: "Cijena usluge može se mijenjati ovisno o zamagljenosti farova.",
      },
      {
        title: "Poliranje laka",
        price: "100 (po sloju)",
        services: [
          "Detaljno pranje eksterijera kao priprema",
          "Kemijska i mehanička dekontaminacija kao priprema laka za poliranje",
          "Zaštita voskom ako nije odabrana druga vrsta zaštite",
        ],
        priceSuv: "30",
        priceTransporter: "80",
        info: "Cijena usluge može se mijenjati ovisno o veličini vozila i oštećenosti laka",
      },
      {
        title: "Višeslojna korekcija laka",
        price: "500",
        services: [
          "Detaljno pranje eksterijera kao priprema",
          "Kemijska i mehanička dekontaminacija kao priprema laka za poliranje",
          "Zaštita voskom ako nije odabrana druga vrsta zaštite",
          "Po potrebi, zatočkavanje i brušenje većih ogrebotina (kupac donosi boju)",
        ],
        priceSuv: "100",
        priceTransporter: "180",
      },
      {
        title: "Zaštita voskom u trajanju od 3 mjeseca",
        price: "15",
        services: [
          "Detaljno pranje eksterijera kao priprema",
          "Priprema laka za zaštitni premaz",
          "Premaz voskom za zaštitu laka",
        ],
      },
      {
        title: "Zaštita sintetičkim premazom u trajanju od 6-8 mjeseci",
        price: "50",
        services: [
          "Detaljno pranje eksterijera kao priprema",
          "Priprema laka za zaštitni premaz",
          "Premaz sintetičkim premazom",
        ],
      },
      {
        title: "Zaštita keramičkim premazom u trajanju od 5 godina",
        price: "300",
        services: [
          "Detaljno pranje eksterijera kao priprema",
          "Priprema laka za zaštitni premaz",
          "Premaz keramičkim premazom",
        ],
        priceSuv: "100",
        priceTransporter: "180",
        info: "Napomena: Prije nanošenja keramičkog premaza, obavezan je barem jedan sloj poliranja kako bi se premaz dobro primio i postigao maksimalnu učinkovitost. (Poliranje nije uključeno u cijenu usluge keramičkog premaza.)",
      },
    ],
    []
  );

  useEffect(() => {
    const link = document.createElement("link");
    const meta = document.createElement("meta");

    link.rel = "canonical";
    link.href = "https://4d-detailing.hr/poliranje-i-zaštita";
    document.head.appendChild(link);

    meta.setAttribute("property", "og:url");
    meta.content = "https://4d-detailing.hr/poliranje-i-zaštita";
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(meta);
      resetScroll();
    };
  }, []);

  return (
    <>
      <Header title={polishContent.title} bgImage={polishContent.headerImg} />

      <main className="category">
        <article className="container">
          <section>
            <p>
              {polishContent.content?.split(/\n/g).map((line, index) => (
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
          <FadeImage src={polishContent.contentImg} alt="Slika poliranja" />
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

export default Polishing;
