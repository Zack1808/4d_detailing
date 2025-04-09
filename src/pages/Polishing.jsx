import React, { useEffect, useMemo } from "react";

import { useScrollPosition } from "../context/scrollContext";
import { useStore } from "../context/storeContext";

import transition from "../helpers/transition";

import { Header, PriceCard, Button, FadeImage } from "../components";

import "../css/pages/Services.css";

const Polishing = () => {
  const { resetScroll } = useScrollPosition();

  const { polishContent, polishList } = useStore();

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
          {polishList?.map((priceCard) => (
            <PriceCard {...priceCard} key={polishList.id} />
          ))}
        </article>
      </main>
    </>
  );
};

export default Polishing;
