import React, { useCallback, useMemo, useRef } from "react";

import { useScrollPosition } from "../context/scrollContext";

import {
  Hero,
  CategoryCard,
  CommentDisplay,
  InfiniteScroller,
} from "../components";

import "../css/pages/Home.css";

const Home = () => {
  const mainRef = useRef();

  const { scrollTo } = useScrollPosition();

  const cards = useMemo(
    () => [
      {
        to: "/čišćenje-eksterijera",
        title: "Čišćenje Eksterijera",
        imageUrl: "/eksterijer.webp",
      },
      {
        to: "/čišćenje-interijera",
        title: "Čišćenje Interijera",
        imageUrl: "/Interjer.webp",
      },
      {
        to: "/poliranje-i-zaštita",
        title: "Poliranje i Zaštita",
        imageUrl: "/poliranje.webp",
      },
      {
        to: "/posebni-paketi",
        title: "Posebni Paketi",
        imageUrl: "/hero-bg-big.webp",
      },
    ],
    []
  );

  const comments = useMemo(
    () => [
      {
        comment: `Odlična usluga! Od jednostavnosti dogovora, do konačnog rezultata, sve je bilo za preporuku.`,
        user: "Darko Kovač",
        stars: 5,
      },
      {
        comment: `Bio sam kod njega da mi upristoji Toyotu kad sam ju "preuzeo" od svoje gospođe, preporučam mladog gospodina!`,
        user: "Zvonimir Migić",
        stars: 5,
      },
      {
        comment: `Posao odlično obavljen, auto je ispoliran kao i prvog dana kad je izašao iz salona, sve pohvale, rad i komunikacija savršeni, definitivno za preporuku drugima.`,
        user: "Luka Ferencak",
        stars: 5,
      },
    ],
    []
  );

  const handleClick = useCallback(() => {
    const { top } = mainRef.current.getBoundingClientRect();

    scrollTo(top - 70);
  }, [scrollTo]);

  return (
    <div className="page-container">
      <Hero scrollTo={handleClick} />

      <main ref={mainRef} className="home">
        <article className="container">
          <h2>Naše usluge</h2>

          <p>
            Nudimo vam pakete profesionalnih usluga detaljnog čišćenja vozila.
            One uključuju dubinsko čišćenje, poliranje i zaštitu vašeg limenog
            ljubimca.
          </p>

          <section className="category-list">
            {cards.map((card) => (
              <CategoryCard key={card.to} {...card} />
            ))}
          </section>
        </article>

        <hr />

        <article className="container">
          <h2>Recenzije</h2>
          <InfiniteScroller>
            {comments.map((comment) => (
              <CommentDisplay {...comment} key={comment.user} />
            ))}
          </InfiniteScroller>
        </article>
      </main>
    </div>
  );
};

export default Home;
