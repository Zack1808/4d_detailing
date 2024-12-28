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
const About = React.lazy(() => import("./pages/About"));
const Privacy = React.lazy(() => import("./pages/Privacy"));
const Terms = React.lazy(() => import("./pages/Terms"));
const Error404 = React.lazy(() => import("./pages/Error404"));
const Gallery = React.lazy(() => import("./pages/Gallery"));
const Contact = React.lazy(() => import("./pages/Contact"));

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
            <Route exact path="/" element={<Home />} />
            <Route exact path="/čišćenje-eksterijera" element={<Exterior />} />
            <Route exact path="/čišćenje-interijera" element={<Interior />} />
            <Route exact path="/poliranje-i-zaštita" element={<Polishing />} />
            <Route exact path="/posebni-paketi" element={<Packages />} />
            <Route exact path="/o-nama" element={<About />} />
            <Route exact path="/pravila-privatnosti" element={<Privacy />} />
            <Route exact path="/uvijeti-korištenja" element={<Terms />} />
            <Route exact path="/galerija" element={<Gallery />} />
            <Route exact path="/kontakt" element={<Contact />} />
            <Route path="*" element={<Error404 />} />
          </AnimatedRouted>
          <Footer />
        </div>
        <ToastContainer />
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
