import { useState, useCallback, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { FaXmark } from "react-icons/fa6";

import { Home } from "./pages";

import { Navbar, Loading, Footer } from "./components";

const App = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [dropDownIsOpen, setDropDownIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dropdownHeight, setDropDownHeight] = useState(0);

  const interijer = useRef(null);
  const eksterijer = useRef(null);
  const poliranje = useRef(null);
  const paketi = useRef(null);

  const handleEndLoading = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (
      !interijer.current ||
      !eksterijer.current ||
      !poliranje.current ||
      !paketi.current
    )
      return;

    setDropDownHeight(
      (interijer.current.offsetHeight +
        eksterijer.current.offsetHeight +
        poliranje.current.offsetHeight +
        paketi.current.offsetHeight +
        paketi.current.offsetHeight) /
        16
    );
  }, []);

  return (
    <>
      <Loading className={loading ? "loading" : ""} />
      <BrowserRouter>
        <div
          className={`outer-container ${loading ? "" : "loaded"}`}
          style={{ "--dropDownHeight": `${dropdownHeight}rem` }}
        >
          <div className={`content ${menuIsOpen ? "content-menu-open" : ""}`}>
            <Navbar toggleMenu={() => setMenuIsOpen(true)} />
            <Routes>
              <Route
                path="/"
                element={<Home onLoadingComplete={handleEndLoading} />}
              />
            </Routes>
            <Footer />
          </div>
          <div
            className={`mobile-navigation ${
              menuIsOpen ? "navigation-menu-open" : ""
            }`}
          >
            <button className="close-menu" onClick={() => setMenuIsOpen(false)}>
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
                      to="/eksterijer"
                      ref={eksterijer}
                      onClick={(event) => {
                        event.stopPropagation();
                        setMenuIsOpen(false);
                      }}
                    >
                      Čišćenje Eksterijera
                    </Link>
                    <Link
                      to="/interijer"
                      ref={interijer}
                      onClick={(event) => {
                        event.stopPropagation();
                        setMenuIsOpen(false);
                      }}
                    >
                      Čišćenje Interijera
                    </Link>
                    <Link
                      to="/poliranje"
                      ref={poliranje}
                      onClick={(event) => {
                        event.stopPropagation();
                        setMenuIsOpen(false);
                      }}
                    >
                      Poliranje i zaštita
                    </Link>
                    <Link
                      to="/paketi"
                      ref={paketi}
                      onClick={(event) => {
                        event.stopPropagation();
                        setMenuIsOpen(false);
                      }}
                    >
                      Paketi
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
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
