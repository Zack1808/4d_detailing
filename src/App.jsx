import { useState } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { NavigationBar, Navbar, Hero } from "./components";

import { useScrollPosition } from "./context/scrollContext";

const App = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const toggleMenu = () =>
    setMenuIsOpen((prevState) => {
      document.documentElement.style.setProperty(
        "--scroll-offset",
        `${containerRef.current.scrollTop}px`
      );
      return !prevState;
    });

  const { containerRef } = useScrollPosition();

  return (
    <BrowserRouter>
      <Navbar
        mobile
        toggleMenu={toggleMenu}
        className={menuIsOpen ? "menu-open" : ""}
      />
      <div
        className={`content ${menuIsOpen ? "menu-open" : ""}`}
        ref={containerRef}
      >
        <NavigationBar toggleMenu={toggleMenu} />
        <Hero />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
