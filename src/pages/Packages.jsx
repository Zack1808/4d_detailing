import React, { useEffect, useMemo } from "react";

import { useScrollPosition } from "../context/scrollContext";
import { useStore } from "../context/storeContext";

import transition from "../helpers/transition";

import { Header, PriceCard, Button, FadeImage } from "../components";

import "../css/pages/Services.css";

const Packages = () => {
  const { resetScroll } = useScrollPosition();

  const { packagesContent, packagesList } = useStore();

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
          {packagesList?.map((priceCard) => (
            <PriceCard {...priceCard} key={packagesList.id} />
          ))}
        </article>
      </main>
    </>
  );
};

export default Packages;
