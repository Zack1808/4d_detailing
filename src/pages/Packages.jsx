import React, { useEffect, useMemo } from "react";

import { useScrollPosition } from "../context/scrollContext";
import { useStore } from "../context/storeContext";

import transition from "../helpers/transition";

import { Header, PriceCard, Button, FadeImage } from "../components";

import "../css/pages/Services.css";

const Packages = React.memo(() => {
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
        fallbackImage="/packages.avif"
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
            fallbackImage="https://images.unsplash.com/photo-1614687154052-e05046c3feec?q=80&w=2008&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
});

export default Packages;
