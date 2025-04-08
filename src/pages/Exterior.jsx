import React, { useEffect } from "react";

import { useScrollPosition } from "../context/scrollContext";
import { useStore } from "../context/storeContext";

import transition from "../helpers/transition";

import { Header, PriceCard, Button, FadeImage } from "../components";

import "../css/pages/Services.css";

const Exterior = () => {
  const { resetScroll } = useScrollPosition();

  const { exteriorContent, exteriorList } = useStore();

  useEffect(() => {
    const link = document.createElement("link");
    const meta = document.createElement("meta");

    link.rel = "canonical";
    link.href = "https://4d-detailing.hr/čišćenje-eksterijera";
    document.head.appendChild(link);

    meta.setAttribute("property", "og:url");
    meta.content = "https://4d-detailing.hr/čišćenje-eksterijera";
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
        title={exteriorContent.title}
        bgImage={exteriorContent.headerImg}
      />

      <main className="category">
        <article className="container">
          <section>
            <p>
              {exteriorContent.content?.split(/\n/g).map((line, index) => (
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
          <FadeImage src={exteriorContent.contentImg} alt="Slika eksterijera" />
        </article>

        <article className="container category-prices">
          {exteriorList?.map((priceCard) => (
            <PriceCard {...priceCard} key={priceCard.id} />
          ))}
        </article>
      </main>
    </>
  );
};

export default Exterior;
