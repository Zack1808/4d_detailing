import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useStore } from "./context/storeContext";

import { NavigationBar, Navbar, Footer, Loading } from "./components";

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
const Contact = React.lazy(() => import("./pages/Contact"));

import { useScrollPosition } from "./context/scrollContext";

const App = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);

  const { containerRef } = useScrollPosition();
  const { loading } = useStore();

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
      >
        <NavigationBar toggleMenu={toggleMenu} />
        <div className="page-container" ref={containerRef}>
          <GoogleAnalytic
            hasConsent={hasConsent}
            consentGiven={handleConsent}
            menuIsOpen={menuIsOpen}
          />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <React.Suspense fallback={<Loading loading={loading} />}>
                  <Home />
                </React.Suspense>
              }
            />
            <Route
              exact
              path="/čišćenje-eksterijera"
              element={
                <React.Suspense fallback={<Loading loading={true} />}>
                  <Exterior />
                </React.Suspense>
              }
            />
            <Route
              exact
              path="/čišćenje-interijera"
              element={
                <React.Suspense fallback={<Loading loading={true} />}>
                  <Interior />
                </React.Suspense>
              }
            />
            <Route
              exact
              path="/poliranje-i-zaštita"
              element={
                <React.Suspense fallback={<Loading loading={true} />}>
                  <Polishing />
                </React.Suspense>
              }
            />
            <Route
              exact
              path="/posebni-paketi"
              element={
                <React.Suspense fallback={<Loading loading={true} />}>
                  <Packages />
                </React.Suspense>
              }
            />
            <Route
              exact
              path="/o-nama"
              element={
                <React.Suspense fallback={<Loading loading={true} />}>
                  <About />
                </React.Suspense>
              }
            />
            <Route
              exact
              path="/pravila-privatnosti"
              element={
                <React.Suspense fallback={<Loading loading={true} />}>
                  <Privacy />
                </React.Suspense>
              }
            />
            <Route
              exact
              path="/uvijeti-korištenja"
              element={
                <React.Suspense fallback={<Loading loading={true} />}>
                  <Terms />
                </React.Suspense>
              }
            />
            <Route
              exact
              path="/kontakt"
              element={
                <React.Suspense fallback={<Loading loading={true} />}>
                  <Contact />
                </React.Suspense>
              }
            />
            <Route path="*" element={<Error404 />} />
          </Routes>
          <Footer />
        </div>
      </div>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
