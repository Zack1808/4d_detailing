import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { NavigationBar, Navbar, Footer, GoogleAnalytic } from "./components";
import { Home } from "./pages";

import { useScrollPosition } from "./context/scrollContext";

const App = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);

  const { containerRef } = useScrollPosition();

  useEffect(() => {
    const consent = JSON.parse(localStorage.getItem("4d-consent"));
    setHasConsent(consent);
  }, []);

  const toggleMenu = () =>
    setMenuIsOpen((prevState) => {
      document.documentElement.style.setProperty(
        "--scroll-offset",
        `${containerRef.current.scrollTop}px`
      );
      return !prevState;
    });

  const handleConsent = () => {
    setHasConsent((prevState) => {
      localStorage.setItem("4d-consent", JSON.stringify(!hasConsent));
      return !prevState;
    });
  };

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
        <GoogleAnalytic hasConsent={hasConsent} consentGiven={handleConsent} />
        <NavigationBar toggleMenu={toggleMenu} />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </div>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
