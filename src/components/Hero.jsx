import React, { useEffect } from "react";

import { Button } from "./";

import "../css/components/Hero.css";

const Hero = React.memo(
  ({ scrollTo, title, subtitle, heroSmallBg, heroBigBg }) => {
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
        style={{ "--heroBigBg": `url(${heroBigBg})` }}
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
