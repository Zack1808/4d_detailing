import React from "react";
import { Link } from "react-router-dom";
import { FaBars, FaChevronDown } from "react-icons/fa";

import logo from "/logo.svg";

import "../css/components/Navigation.css";

const Navbar = ({ mobile }) => {
  return (
    <nav className={mobile ? "mobile-nav" : "desktop-nav"}>
      <ul className="main-links">
        <li>
          <Link to="/">Početna</Link>
        </li>
        <li>
          <button className="btn-link">
            Usluge <FaChevronDown />
          </button>
          <ul className="secondary-links">
            <li>
              <Link to="/čišćenje-eksterijera" onClick={(e) => e.target.blur()}>
                Čišćenje eksterijera
              </Link>
            </li>
            <li>
              <Link to="/čišćenje-interijera" onClick={(e) => e.target.blur()}>
                Čišćenje interjera
              </Link>
            </li>
            <li>
              <Link to="/poliranje-i-zaštita" onClick={(e) => e.target.blur()}>
                Poliranje i zaštita
              </Link>
            </li>
            <li>
              <Link to="/posebni-paketi" onClick={(e) => e.target.blur()}>
                Posebni Paketi
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/o-nama">O nama</Link>
        </li>
        <li>
          <Link to="/galerija">Galerija</Link>
        </li>
        <li>
          <Link to="/kontakt">Kontakt</Link>
        </li>
      </ul>
    </nav>
  );
};

export const Navigation = () => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <img className="navbar-logo" src={logo} alt="4D Detailing logo" />
        </Link>
        <Navbar />
        {/* <FaBars className="menu-icon" /> */}
      </div>
    </header>
  );
};
