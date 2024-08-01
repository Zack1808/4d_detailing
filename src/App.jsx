import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { FaXmark } from "react-icons/fa6";

import { Home } from "./pages";

import { Navbar, Loading } from "./components";

const App = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    const img2 = new Image();

    img.src = "/hero-bg-big.webp";
    img2.src = "/hero-bg-small.webp";

    const timer = setTimeout(() => {
      setLoading(false);
      timer;
    }, 1500);

    img.onload = () => {
      img2.onload = timer;
    };

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <Loading className={loading ? "loading" : ""} />
      <BrowserRouter>
        <div className={`outer-container ${loading ? "" : "loaded"}`}>
          <div className={`content ${menuIsOpen ? "content-menu-open" : ""}`}>
            <Navbar toggleMenu={() => setMenuIsOpen(true)} />
            <Routes>
              <Route path="/" element={<Home />} />
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
              <li onClick={() => setMenuIsOpen(false)}>
                <Link to="/usluge">Usluge</Link>
              </li>
              <li onClick={() => setMenuIsOpen(false)}>
                <Link to="/onama">O nama</Link>
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
