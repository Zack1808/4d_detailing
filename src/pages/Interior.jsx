import React, { useEffect, useMemo } from "react";

import { useScrollPosition } from "../context/scrollContext";
import { useStore } from "../context/storeContext";

import transition from "../helpers/transition";

import { Header, PriceCard, Button, FadeImage } from "../components";

import "../css/pages/Services.css";

const Interior = () => {
  const { resetScroll } = useScrollPosition();

  const { interiorContent } = useStore();

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
      <Header
        title={interiorContent.title}
        bgImage={interiorContent.headerImg}
      />

      <main className="category">
        <article className="container">
          <section>
            <p>
              {interiorContent.content?.split(/\n/g).map((line, index) => (
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
          <FadeImage src={interiorContent.contentImg} alt="Slika interijera" />
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

export default Interior;
