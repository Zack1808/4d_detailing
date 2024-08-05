import { useEffect, useState, useRef } from "react";

import {
  HeroContainer,
  CategoryCard,
  CommentDisplay,
  InfinteScroller,
} from "../components";

import transition from "../helpers/transition";

import "../css/pages/Home.css";

const imagesToLoad = [
  "/hero-bg-big.webp",
  "/hero-bg-small.webp",
  "/Interjer.webp",
  "/eksterijer.webp",
  "/poliranje.webp",
];

const cards = [
  {
    to: "/eksterijer",
    smallTitle: "Čišćenje",
    bigTitle: "Eksterijera",
    imageUrl: "/eksterijer.webp",
  },
  {
    to: "/interijer",
    smallTitle: "Čišćenje",
    bigTitle: "Interijera",
    imageUrl: "/Interjer.webp",
  },
  {
    to: "/poliranje",
    smallTitle: "Poliranje i",
    bigTitle: "Zaštita",
    imageUrl: "/poliranje.webp",
  },
  {
    to: "/paketi",
    smallTitle: "Posebni",
    bigTitle: "Paketi",
    imageUrl: "/hero-bg-big.webp",
  },
];

const Home = ({ onLoadingComplete, scrollTo, resetScroll }) => {
  const [imagesLoaded, setImagesLoaed] = useState(0);

  const servicesRef = useRef(null);

  const handleClick = () => {
    if (!servicesRef.current) return;

    const { top } = servicesRef.current.getBoundingClientRect();

    const containerPosition = top - 50;

    scrollTo(containerPosition);
  };

  useEffect(() => {
    const handleImageLoaded = () => {
      setImagesLoaed((prevState) => prevState + 1);
    };

    imagesToLoad.forEach((image) => {
      const img = new Image();
      img.src = image;
      img.onload = handleImageLoaded;
      img.onerror = handleImageLoaded;
    });

    resetScroll();
  }, []);

  useEffect(() => {
    if (imagesLoaded < imagesToLoad.length) return;

    onLoadingComplete();
  }, [imagesLoaded]);

  return (
    <div>
      <HeroContainer onClick={handleClick} />
      <div className="home-offers" ref={servicesRef} aria-label="Prikaz usluga">
        <div className="home-container">
          <h2>Lorem ipsum dolor sit.</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
            repellendus soluta porro harum ab dicta exercitationem aperiam rem
            ex perferendis suscipit eius quo, quasi officia esse molestias.
            Voluptates voluptatibus pariatur totam quos. Quae saepe eius
            officiis fugit nulla necessitatibus earum.
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
