import React, { useEffect } from "react";

import { Button } from "./";

import { useStore } from "../context/storeContext";

import "../css/components/Hero.css";

const Hero = React.memo(
  ({
    scrollTo,
    title,
    subtitle,
    heroSmallBg,
    heroBigBg,
    fallbackBig,
    fallbackSmall,
  }) => {
    const { loadedCache } = useStore();

    const isLoadedBig = loadedCache[heroBigBg];
    const isLoadedSmall = loadedCache[heroSmallBg];

    useEffect(() => {
      const heroContainer = document.querySelector(".hero-container");
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            heroContainer.classList.add("lazy-loaded");
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(heroContainer);
      return () => observer.disconnect();
    }, []);

    return (
      <div
        className="hero-container"
        style={{
          "--heroBigBg": isLoadedBig
            ? `url(${heroBigBg})`
            : `url(${fallbackBig})`,
          "--heroSmallBg": isLoadedSmall
            ? `url(${heroSmallBg})`
            : `url(${fallbackSmall})`,
        }}
      >
        <div className="container">
          <h1>{title}</h1>
          <p>{subtitle}</p>
          <div className="hero-btn-container">
            <Button primary onClick={scrollTo}>
              Pregledaj usluge
            </Button>
            <Button link="/kontakt" secondary>
              Kontaktiraj nas
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

export default Hero;
