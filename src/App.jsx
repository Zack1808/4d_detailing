import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { FaXmark } from "react-icons/fa6";

import { Navbar } from "./components";

const App = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="outer-container">
        <div className={`content ${menuIsOpen ? "content-menu-open" : ""}`}>
          <Navbar toggleMenu={() => setMenuIsOpen(true)} />
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
            <li>
              <Link to="/">Početna</Link>
            </li>
            <li>
              <Link to="/usluge">Usluge</Link>
            </li>
            <li>
              <Link to="/onama">O nama</Link>
            </li>
            <li>
              <Link to="/kontakt">Kontakt</Link>
            </li>
          </ul>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
