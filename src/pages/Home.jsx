import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { useStore } from "../context/storeContext";

import { useScrollPosition } from "../context/scrollContext";

import { useComments } from "../firebaseFunctions/comments";

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
  const [modal1IsOpen, setModal1IsOpen] = useState(false);
  const [modal2IsOpen, setModal2IsOpen] = useState(false);
  const [starCount, setStarCount] = useState(1);
  const [selected, setSelected] = useState(0);

  const { heroData } = useStore();

  const mainRef = useRef();
  const reviewFormRef = useRef();

  const { scrollTo, resetScroll } = useScrollPosition();

  const { getComments, comments, loading, addComment } = useComments();

  const cards = useMemo(
    () => [
      {
        to: "/čišćenje-eksterijera",
        title: "Čišćenje Eksterijera",
        imageUrl: "/eksterijer.avif",
      },
      {
        to: "/čišćenje-interijera",
        title: "Čišćenje Interijera",
        imageUrl: "/interjer.avif",
      },
      {
        to: "/poliranje-i-zaštita",
        title: "Poliranje i Zaštita",
        imageUrl: "/hero-bg-big.avif",
      },
      {
        to: "/posebni-paketi",
        title: "Posebni Paketi",
        imageUrl: "/packages.avif",
      },
    ],
    []
  );

  useEffect(() => {
    scrollTo(1);
    getComments();
    const link = document.createElement("link");
    const meta = document.createElement("meta");

    link.rel = "canonical";
    link.href = "https://4d-detailing.hr";
    document.head.appendChild(link);

    meta.setAttribute("property", "og:url");
    meta.content = "https://4d-detailing.hr";
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(meta);
      resetScroll();
    };
  }, []);

  const handleScroll = useCallback(() => {
    const { top } = mainRef.current.getBoundingClientRect();
    scrollTo(top - 110);
  }, [scrollTo]);

  const clearReviewForm = useCallback(() => {
    setStarCount(1);
    reviewFormRef.current.name.value = "";
    reviewFormRef.current.surname.value = "";
    reviewFormRef.current.reviewText.value = "";
  }, [setStarCount, reviewFormRef.current]);

  const handleOpenModal = useCallback(() => {
    setModal1IsOpen(true);
  }, [setModal1IsOpen]);

  const handleCloseModal = useCallback(() => {
    setModal1IsOpen(false);
    setModal2IsOpen(false);
    clearReviewForm();
  }, [setModal1IsOpen, clearReviewForm]);

  const handleSelected = (index) => {
    setSelected(index);
    setModal2IsOpen(true);
  };

  const sendReview = useCallback(
    (event) => {
      event.preventDefault();
      const user = `${reviewFormRef.current.name.value} ${reviewFormRef.current.surname.value}`;
      const comment = reviewFormRef.current.reviewText.value;
      addComment(starCount, user, comment, handleCloseModal);
    },
    [clearReviewForm, starCount, handleCloseModal]
  );

  return (
    <>
      <Hero scrollTo={handleScroll} {...heroData} />

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
                style={{ "--transition-delay": `${0.07 * index}s` }}
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
            {comments.map((comment, index) => (
              <CommentDisplay
                {...comment}
                index={index}
                key={comment.user}
                limitedHeight
                handleSelect={handleSelected}
              />
            ))}
          </InfiniteScroller>
        </article>
      </main>

      <Modal
        isOpen={modal1IsOpen}
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
            <Button primary>
              {loading ? (
                <AiOutlineLoading3Quarters className="loading-spinner" />
              ) : (
                "Pošalji recenziju"
              )}
            </Button>
            <Button type="button" onClick={handleCloseModal}>
              Odustani
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={modal2IsOpen}
        title={"Recenzija"}
        closeModal={handleCloseModal}
        noBg
      >
        {comments.length && (
          <CommentDisplay
            user={comments[selected].user}
            comment={comments[selected].comment}
            stars={comments[selected].stars}
            handleSelect={handleSelected}
          />
        )}
      </Modal>
    </>
  );
};

export default Home;
