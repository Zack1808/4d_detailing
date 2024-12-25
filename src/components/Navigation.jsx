import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaChevronDown } from "react-icons/fa";
import { GrFormClose } from "react-icons/gr";

import { useScrollPosition } from "../context/scrollContext";

import logo from "/logo.svg";

import "../css/components/Navigation.css";

export const Navbar = ({ mobile, toggleMenu, className }) => {
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const handleClick = (event) => {
    event.target.blur();
    toggleMenu && toggleMenu();
    setDropDownOpen(false);
  };

  return (
    <nav className={`${mobile ? "mobile-nav" : "desktop-nav"} ${className}`}>
      <button
        onClick={toggleMenu}
        className="menu-close"
        aria-label="Zatvori izbornik"
      >
        <GrFormClose size={32} />
      </button>
      <ul className="main-links">
        <li>
          <Link to="/" onClick={toggleMenu}>
            Početna
          </Link>
        </li>
        <li>
          <button
            className="btn-link"
            onClick={() => setDropDownOpen((prevState) => !prevState)}
          >
            Usluge{" "}
            <FaChevronDown
              className={`menu-chevron ${
                dropDownOpen ? "menu-dropdown-open" : ""
              }`}
            />
          </button>
          <ul
            className={`secondary-links ${
              dropDownOpen ? "menu-dropdown-open" : ""
            }`}
          >
            <li>
              <Link to="/čišćenje-eksterijera" onClick={handleClick}>
                Čišćenje eksterijera
              </Link>
            </li>
            <li>
              <Link to="/čišćenje-interijera" onClick={handleClick}>
                Čišćenje interjera
              </Link>
            </li>
            <li>
              <Link to="/poliranje-i-zaštita" onClick={handleClick}>
                Poliranje i zaštita
              </Link>
            </li>
            <li>
              <Link to="/posebni-paketi" onClick={handleClick}>
                Posebni Paketi
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/o-nama" onClick={toggleMenu}>
            O nama
          </Link>
        </li>
        <li>
          <Link to="/galerija" onClick={toggleMenu}>
            Galerija
          </Link>
        </li>
        <li>
          <Link to="/kontakt" onClick={toggleMenu}>
            Kontakt
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export const NavigationBar = ({ toggleMenu }) => {
  const [scrolledEnough, setScrolledEnough] = useState(false);

  const headerRef = useRef();

  const { containerRef } = useScrollPosition();

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current.scrollTop > 60) {
        setScrolledEnough(true);
        document.documentElement.style.setProperty(
          "--pop-up-visibility",
          "visible"
        );
        document.documentElement.style.setProperty("--pop-up-bottom", 0);
      } else if (containerRef.current.scrollTop < 30) setScrolledEnough(false);
    };

    containerRef.current.addEventListener("scroll", handleScroll);

    document.documentElement.style.setProperty(
      "--header-size",
      `${headerRef.current.offsetHeight * -1}px`
    );

    return () =>
      containerRef.current.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={scrolledEnough ? "scrolled" : ""} ref={headerRef}>
      <div className="container">
        <Link to="/">
          <img
            className="navbar-logo"
            width="13rem"
            height="3.64rem"
            src={logo}
            alt="4D Detailing logo"
          />
        </Link>
        <Navbar />
        <button
          className="menu-btn"
          onClick={toggleMenu}
          aria-label="Otvori izbornik"
        >
          <FaBars className="menu-icon" />
        </button>
      </div>
    </header>
  );
};
