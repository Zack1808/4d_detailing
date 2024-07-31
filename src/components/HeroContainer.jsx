import { Button } from "./";

import "../css/components/HeroContainer.css";

const HeroContainer = () => {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1>Lorem, ipsum dolor.</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, rem.
        </p>
        <Button primary>Vidi više</Button>
      </div>
    </div>
  );
};

export default HeroContainer;
