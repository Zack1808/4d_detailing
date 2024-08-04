import { Button } from "./";

import "../css/components/HeroContainer.css";

const HeroContainer = ({ onClick }) => {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1>Lorem, ipsum dolor.</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, rem.
        </p>
        <Button primary onClick={onClick} aria-label="Pomaknite se na usluge">
          Pregledaj usluge
        </Button>
      </div>
      <div className="hero-info-container">
        <p>
          Za rezervaciju termina kontaktirajte nas na mail{" "}
          <a
            href="mailto:4d.detailing.ln@gmail.com"
            aria-label="Email za kontakt"
          >
            4d.detailing.ln@gmail.com
          </a>{" "}
          ili na broj{" "}
          <a href="tel:+385977588716" aria-label="Broj telefona za kontakt">
            +385 97 758 8716
          </a>
        </p>
      </div>
    </div>
  );
};

export default HeroContainer;
