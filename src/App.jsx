import { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { FaXmark } from "react-icons/fa6";

import { Home } from "./pages";

import { Navbar, Loading } from "./components";

const App = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [dropDownIsOpen, setDropDownIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleEndLoading = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <Loading className={loading ? "loading" : ""} />
      <BrowserRouter>
        <div className={`outer-container ${loading ? "" : "loaded"}`}>
          <div className={`content ${menuIsOpen ? "content-menu-open" : ""}`}>
            <Navbar toggleMenu={() => setMenuIsOpen(true)} />
            <Routes>
              <Route
                path="/"
                element={<Home onLoadingComplete={handleEndLoading} />}
              />
            </Routes>
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
                      onClick={(event) => {
                        event.stopPropagation();
                        setMenuIsOpen(false);
                      }}
                    >
                      Čišćenje Eksterijera
                    </Link>
                    <Link
                      to="/interijer"
                      onClick={(event) => {
                        event.stopPropagation();
                        setMenuIsOpen(false);
                      }}
                    >
                      Čišćenje Interijera
                    </Link>
                    <Link
                      to="/interijer"
                      onClick={(event) => {
                        event.stopPropagation();
                        setMenuIsOpen(false);
                      }}
                    >
                      Poliranje i zaštita
                    </Link>
                    <Link
                      to="/paketi"
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
