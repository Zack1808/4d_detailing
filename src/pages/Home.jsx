import { useEffect, useState } from "react";

import { HeroContainer, CategoryCard } from "../components";

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

const Home = ({ onLoadingComplete }) => {
  const [imagesLoaded, setImagesLoaed] = useState(0);

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
  }, []);

  useEffect(() => {
    if (imagesLoaded < imagesToLoad.length) return;

    onLoadingComplete();
  }, [imagesLoaded]);

  return (
    <>
      <HeroContainer />
      <div className="home-offers">
        <div className="home-container">
          <h2>Lorem ipsum dolor sit.</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
            repellendus soluta porro harum ab dicta exercitationem aperiam rem
            ex perferendis suscipit eius quo, quasi officia esse molestias.
            Voluptates voluptatibus pariatur totam quos. Quae saepe eius
            officiis fugit nulla necessitatibus earum.
          </p>
          <div className="home-categories">
            {cards.map((card, index) => (
              <CategoryCard key={index} {...card} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
