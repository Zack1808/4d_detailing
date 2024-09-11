import { useEffect, useRef, useMemo, useCallback } from "react";

import {
  HeroContainer,
  CategoryCard,
  CommentDisplay,
  InfinteScroller,
} from "../components";

import transition from "../helpers/transition";

import "../css/pages/Home.css";

const Home = ({ scrollTo, resetScroll }) => {
  const servicesRef = useRef(null);

  const handleClick = useCallback(() => {
    if (!servicesRef.current) return;

    const { top } = servicesRef.current.getBoundingClientRect();

    const containerPosition = top - 50;

    scrollTo(containerPosition);
  }, [scrollTo]);

  useEffect(() => {
    resetScroll();
  }, [resetScroll]);

  const cards = useMemo(
    () => [
      {
        to: "/čišćenje-eksterijera",
        smallTitle: "Čišćenje",
        bigTitle: "Eksterijera",
        imageUrl: "/eksterijer.webp",
      },
      {
        to: "/čišćenje-interijera",
        smallTitle: "Čišćenje",
        bigTitle: "Interijera",
        imageUrl: "/Interjer.webp",
      },
      {
        to: "/poliranje-i-zaštita",
        smallTitle: "Poliranje i",
        bigTitle: "Zaštita",
        imageUrl: "/poliranje.webp",
      },
      {
        to: "/posebni-paketi",
        smallTitle: "Posebni",
        bigTitle: "Paketi",
        imageUrl: "/hero-bg-big.webp",
      },
    ],
    []
  );

  return (
    <div>
      <HeroContainer onClick={handleClick} />
      <div className="home-offers" ref={servicesRef} aria-label="Prikaz usluga">
        <div className="home-container">
          <h2>Naše usluge</h2>
          <p>
            Nudimo vam pakete profesionalnih usluga detaljnog čišćenja vozila.
            One uključuju dubinsko čišćenje, poliranje i zaštitu vašeg limenog
            ljubimca.
          </p>
          <div className="home-categories" aria-label="Kartice sa uslugama">
            {cards.map((card, index) => (
              <CategoryCard key={index} {...card} />
            ))}
          </div>
        </div>
      </div>
      <hr />
      <div className="home-comment-display" aria-label="Prikaz recenzija">
        <div className="home-container">
          <h2>Recenzije</h2>
          <InfinteScroller>
            <CommentDisplay
              comment="Odlična usluga! Od jednostavnosti dogovora, do konačnog rezultata, sve je bilo za preporuku."
              user="Darko Kovač"
              stars={5}
            />
            <CommentDisplay
              comment={`Bio sam kod njega da mi upristoji Toyotu kad sam ju "preuzeo" od svoje gospođe, preporučam mladog gospodina!`}
              user="Zvonimir Migić"
              stars={5}
            />
          </InfinteScroller>
        </div>
      </div>
    </div>
  );
};

export default transition(Home);
