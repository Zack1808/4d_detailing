import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";

import { useScrollPosition } from "../context/scrollContext";

import transition from "../helpers/transition";

import {
  Hero,
  CategoryCard,
  CommentDisplay,
  InfiniteScroller,
  Button,
  Modal,
  Input,
  Textarea,
  StarSelect,
} from "../components";

import "../css/pages/Home.css";

const Home = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [starCount, setStarCount] = useState(1);

  const mainRef = useRef();
  const reviewFormRef = useRef();

  const { scrollTo, resetScroll } = useScrollPosition();

  const cards = useMemo(
    () => [
      {
        to: "/čišćenje-eksterijera",
        title: "Čišćenje Eksterijera",
        imagesUrl: [
          "/eksterijer.avif",
          "/Interjer.avif",
          "/poliranje.avif",
          "/hero-bg-big.avif",
        ],
      },
      {
        to: "/čišćenje-interijera",
        title: "Čišćenje Interijera",
        imagesUrl: [
          "/Interjer.avif",
          "/eksterijer.avif",
          "/poliranje.avif",
          "/hero-bg-big.avif",
        ],
      },
      {
        to: "/poliranje-i-zaštita",
        title: "Poliranje i Zaštita",
        imagesUrl: [
          "/poliranje.avif",
          "/eksterijer.avif",
          "/Interjer.avif",
          "/hero-bg-big.avif",
        ],
      },
      {
        to: "/posebni-paketi",
        title: "Posebni Paketi",
        imagesUrl: [
          "/hero-bg-big.avif",
          "/eksterijer.avif",
          "/Interjer.avif",
          "/poliranje.avif",
        ],
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

  useEffect(() => resetScroll(), []);

  const handleScroll = useCallback(() => {
    const { top } = mainRef.current.getBoundingClientRect();
    scrollTo(top - 110);
  }, [scrollTo]);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    clearReviewForm();
  };

  const sendReview = (event) => {
    event.preventDefault();
    clearReviewForm();
  };

  const clearReviewForm = () => {
    setStarCount(1);
    reviewFormRef.current.name.value = "";
    reviewFormRef.current.name.surname = "";
    reviewFormRef.current.name.reviewText = "";
  };

  return (
    <div className="page-container">
      <Hero scrollTo={handleScroll} />

      <main ref={mainRef} className="home">
        <article className="container">
          <h2>Naše usluge</h2>

          <p>
            Nudimo vam pakete profesionalnih usluga detaljnog čišćenja vozila.
            One uključuju dubinsko čišćenje, poliranje i zaštitu vašeg limenog
            ljubimca.
          </p>

          <section className="category-list">
            {cards.map((card, index) => (
              <CategoryCard
                key={card.to}
                {...card}
                style={{ "--transition-delay": `${0.07 * (index + 1)}s` }}
              />
            ))}
          </section>
        </article>

        <hr />

        <article className="container home-ratings">
          <h2>Recenzije</h2>

          <p>
            Pogledajte recenzije naših zadovoljnih korisnika. <br />
            Zadovoljni ste našom uslugom?
          </p>

          <Button primary onClick={handleOpenModal}>
            Ostavite recenziju
          </Button>

          <InfiniteScroller>
            {comments.map((comment) => (
              <CommentDisplay {...comment} key={comment.user} />
            ))}
          </InfiniteScroller>
        </article>
      </main>

      <Modal
        isOpen={modalIsOpen}
        title={"Dodaj recenziju"}
        closeModal={handleCloseModal}
      >
        <form onSubmit={sendReview} ref={reviewFormRef}>
          <StarSelect
            starSelectedCount={starCount}
            starSelected={(count) => setStarCount(count)}
            label="Recenzija"
          />

          <Input placeholder="Ime" label="Ime" name="name" id="name" required />
          <Input
            placeholder="Prezime"
            label="Prezime"
            name="surname"
            id="surname"
            required
          />

          <Textarea
            label="Tekst recencije"
            placeholder="Tekst recencije"
            name="reviewText"
            required
            id="review-text"
          />

          <div className="modal-form-buttons">
            <Button primary>Pošalji recenziju</Button>
            <Button type="button" onClick={handleCloseModal}>
              Odustani
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default transition(Home);
