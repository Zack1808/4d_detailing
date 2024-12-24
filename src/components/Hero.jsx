import React from "react";

import { Button } from "./";

import "../css/components/Hero.css";

const Hero = React.memo(({ scrollTo }) => {
  return (
    <div className="hero-container">
      <div className="container">
        <h1>4D Detailing</h1>
        <p>Luksuz koji si možete priuštiti</p>
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
});

export default Hero;
