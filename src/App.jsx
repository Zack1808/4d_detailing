import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  NavigationBar,
  Navbar,
  Footer,
  Loading,
  AnimatedRouted,
} from "./components";

const GoogleAnalytic = React.lazy(() => import("./components/GoogleAnalytic"));

const Home = React.lazy(() => import("./pages/Home"));
const Exterior = React.lazy(() => import("./pages/Exterior"));
const Interior = React.lazy(() => import("./pages/Interior"));
const Polishing = React.lazy(() => import("./pages/Polishing"));
const Packages = React.lazy(() => import("./pages/Packages"));

import { useScrollPosition } from "./context/scrollContext";

const App = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);
  const [loading, setLoading] = useState(true);

  const { containerRef } = useScrollPosition();

  useEffect(() => {
    const consent = JSON.parse(localStorage.getItem("4d-consent"));
    setHasConsent(consent);
  }, []);

  const toggleMenu = () => setMenuIsOpen((prevState) => !prevState);
  const handleConsent = () => {
    setHasConsent((prevState) => {
      localStorage.setItem("4d-consent", JSON.stringify(!hasConsent));
      return !prevState;
    });
  };

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading setLoading={setLoading} />}>
        <Loading loading={loading} />
        <Navbar
          mobile
          toggleMenu={toggleMenu}
          className={menuIsOpen ? "menu-open" : ""}
        />
        <div
          className={`content ${menuIsOpen ? "menu-open" : ""} ${
            !loading ? "loaded" : ""
          }`}
          ref={containerRef}
        >
          <GoogleAnalytic
            hasConsent={hasConsent}
            consentGiven={handleConsent}
            menuIsOpen={menuIsOpen}
          />
          <NavigationBar toggleMenu={toggleMenu} />
          <AnimatedRouted>
            <Route path="/" element={<Home />} />
            <Route path="/čišćenje-eksterijera" element={<Exterior />} />
            <Route path="/čišćenje-interijera" element={<Interior />} />
            <Route path="/poliranje-i-zaštita" element={<Polishing />} />
            <Route path="/posebni-paketi" element={<Packages />} />
          </AnimatedRouted>
          <Footer />
        </div>
        <ToastContainer />
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
