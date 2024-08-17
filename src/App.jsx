import { useState, useEffect, useRef } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { FaXmark } from "react-icons/fa6";

import {
  Home,
  Eksterijer,
  Interijer,
  Poliranje,
  Paketi,
  About,
  Gallery,
} from "./pages";

import { Navbar, Loading, Footer, AnimatedRouted } from "./components";

const images = [
  "/hero-bg-big.webp",
  "/hero-bg-small.webp",
  "/Interjer.webp",
  "/eksterijer.webp",
  "/poliranje.webp",
  "https://images.unsplash.com/photo-1601362840138-44bca7a80305?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1508974239320-0a029497e820?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1614687154052-e05046c3feec?q=80&w=2008&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1527581849771-416a9d62308e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "/gallery-images/Porshe_Cayenne_preview.webp",
  "/gallery-images/Porshe_Cayenne_01.webp",
  "/gallery-images/Porshe_Cayenne_02.webp",
  "/gallery-images/Porshe_Cayenne_03.webp",
  "/gallery-images/Porshe_Cayenne_04.webp",
  "/gallery-images/Porshe_Cayenne_05.webp",
  "https://images.unsplash.com/photo-1592853625601-bb9d23da12fc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1671342352273-35bf118111b8?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1707399720697-b1d1502fac58?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1624001010212-f7bfd7cc74cb?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1650486175161-fcfaf1d83c81?q=80&w=1924&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1628632881998-53db224a524d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1625773049545-fb23fc4f4538?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const MobileNavigation = ({
  menuIsOpen,
  setMenuIsOpen,
  dropDownIsOpen,
  setDropDownIsOpen,
  setDropDownHeight,
}) => {
  const interijer = useRef(null);
  const eksterijer = useRef(null);
  const poliranje = useRef(null);
  const paketi = useRef(null);

  useEffect(() => {
    if (
      interijer.current &&
      eksterijer.current &&
      poliranje.current &&
      paketi.current
    )
      setDropDownHeight(
        (interijer.current.offsetHeight +
          eksterijer.current.offsetHeight +
          poliranje.current.offsetHeight +
          paketi.current.offsetHeight +
          paketi.current.offsetHeight) /
          16
      );
  }, [interijer, eksterijer, poliranje, paketi]);

  return (
    <div
      className={`mobile-navigation ${
        menuIsOpen ? "navigation-menu-open" : ""
      }`}
      aria-hidden={!menuIsOpen}
    >
      <button
        className="close-menu"
        onClick={() => setMenuIsOpen(false)}
        aria-label="Zatvori izbornik"
      >
        <FaXmark style={{ fontSize: "1.5rem" }} />
      </button>
      <ul className="links">
        <li onClick={() => setMenuIsOpen(false)}>
          <Link to="/">Početna</Link>
        </li>
        <li onClick={() => setDropDownIsOpen((prevState) => !prevState)}>
          <span>
            Usluge {dropDownIsOpen ? "-" : "+"}
            <div
              className={`mobile-navigation-dropdown ${
                dropDownIsOpen ? "open" : ""
              }`}
            >
              <Link
                to="/čišćenje-eksterijera"
                ref={eksterijer}
                onClick={(event) => {
                  event.stopPropagation();
                  setMenuIsOpen(false);
                }}
              >
                Čišćenje Eksterijera
              </Link>
              <Link
                to="/čišćenje-interijera"
                ref={interijer}
                onClick={(event) => {
                  event.stopPropagation();
                  setMenuIsOpen(false);
                }}
              >
                Čišćenje Interijera
              </Link>
              <Link
                to="/poliranje-i-zaštita"
                ref={poliranje}
                onClick={(event) => {
                  event.stopPropagation();
                  setMenuIsOpen(false);
                }}
              >
                Poliranje i zaštita
              </Link>
              <Link
                to="/posebni-paketi"
                ref={paketi}
                onClick={(event) => {
                  event.stopPropagation();
                  setMenuIsOpen(false);
                }}
              >
                Posebni paketi
              </Link>
            </div>
          </span>
        </li>
        <li onClick={() => setMenuIsOpen(false)}>
          <Link to="/o-nama">O nama</Link>
        </li>
        <li onClick={() => setMenuIsOpen(false)}>
          <Link to="/galerija">Galerija</Link>
        </li>
        <li onClick={() => setMenuIsOpen(false)}>
          <Link to="/kontakt">Kontakt</Link>
        </li>
      </ul>
    </div>
  );
};

const App = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [dropDownIsOpen, setDropDownIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dropdownHeight, setDropDownHeight] = useState(0);
  const [imagesLoaded, setImagesLoaed] = useState(0);

  const content = useRef(null);

  const scrollToView = (top) => {
    if (!content.current) return;

    const scrollToContainer = top + content.current.scrollTop;

    content.current.scrollTo({
      top: scrollToContainer,
      behavior: "smooth",
    });
  };

  const resetScrollPosition = () => {
    if (!content.current) return;

    content.current.scrollTo({
      top: 0,
    });
  };

  useEffect(() => {
    const handleImageLoaded = () => {
      setImagesLoaed((prevState) => {
        const currentState = prevState + 1;
        if (currentState >= images.length) setLoading(false);
        return currentState;
      });
    };

    images.forEach((image) => {
      const img = new Image();
      img.src = image;
      img.onload = handleImageLoaded;
      img.onerror = handleImageLoaded;
    });
  }, []);

  return (
    <>
      <Loading className={loading ? "loading" : ""} />
      <BrowserRouter>
        <div
          className={`outer-container ${loading ? "" : "loaded"}`}
          style={{ "--dropDownHeight": `${dropdownHeight}rem` }}
        >
          <div
            className={`content ${menuIsOpen ? "content-menu-open" : ""}`}
            ref={content}
          >
            <Navbar toggleMenu={() => setMenuIsOpen(true)} />
            <AnimatedRouted>
              <Route
                path="/"
                element={
                  <Home
                    scrollTo={scrollToView}
                    resetScroll={resetScrollPosition}
                  />
                }
              />
              <Route
                path="/čišćenje-eksterijera"
                element={<Eksterijer resetScroll={resetScrollPosition} />}
              />
              <Route
                path="/čišćenje-interijera"
                element={<Interijer resetScroll={resetScrollPosition} />}
              />
              <Route
                path="/poliranje-i-zaštita"
                element={<Poliranje resetScroll={resetScrollPosition} />}
              />
              <Route
                path="/posebni-paketi"
                element={<Paketi resetScroll={resetScrollPosition} />}
              />
              <Route
                path="/o-nama"
                element={<About resetScroll={resetScrollPosition} />}
              />
              <Route
                path="/galerija"
                element={<Gallery resetScroll={resetScrollPosition} />}
              />
            </AnimatedRouted>
            <Footer />
          </div>
          <MobileNavigation
            dropDownIsOpen={dropDownIsOpen}
            setDropDownHeight={setDropDownHeight}
            setDropDownIsOpen={setDropDownIsOpen}
            menuIsOpen={menuIsOpen}
            setMenuIsOpen={setMenuIsOpen}
          />
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
