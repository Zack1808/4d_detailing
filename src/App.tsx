import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { ToastContainer } from "react-toastify";

import { DataProvider, useData } from "./context/DataContext";

// import Navigation from "./components/layout/Navigation";
// import Footer from "./components/layout/Footer";
import PageLoader from "./components/layout/PageLoader";

import Wheel from "./components/animated/Wheel";
import SEO from "./components/common/SEO";
import Button from "./components/common/Button";

// import GoogleAnalytics from "./components/common/GoogleAnalytics";

// import Home from "./pages/Home";
// import Services from "./pages/Services";
// import Contact from "./pages/Contact";

// const Privacy = lazy(() => import("./pages/Privacy"));
// const Terms = lazy(() => import("./pages/Terms"));
// const Error404 = lazy(() => import("./pages/Error404"));

const AppRoutes: React.FC = () => {
  const { isDark } = useData();

  return (
    <BrowserRouter>
      {/* <Navigation /> */}
      <Suspense fallback={<PageLoader isDark={isDark} />}>
        <Routes>
          {/* <Route path="/" element={<Home />} />
          <Route path="/usluge" element={<Services />} />
          <Route path="/kontakt" element={<Contact />} />
          <Route path="/pravila-privatnosti" element={<Privacy />} />
          <Route path="/uvijeti-koristenja" element={<Terms />} />
          <Route path="*" element={<Error404 />} /> */}

          <Route
            path="*"
            element={
              <div className=" relative overflow-hidden">
                <SEO
                  title="Radovi u tijeku"
                  description="4D Detailing – profesionalne usluge čišćenja, poliranja i zaštite vozila u Velikoj Gorici."
                  canonical="https://4d-detailing.hr/"
                />
                <Wheel
                  isDark={isDark}
                  size={1500}
                  speed={100}
                  className="absolute contain-strict will-change-transform md:right-80 right-0 -z-50 opacity-15 pointer-events-none top-100 -translate-y-3/7 translate-x-1/2 rotate-y-180"
                />
                <div className="h-dvh w-full flex flex-col items-center justify-center backdrop-blur-sm bg-light/70 dark:bg-dark/70 gap-6">
                  <p className="text-dark dark:text-light flex gap-6 items-center text-4xl font-semibold">
                    Stranica je trenutno nedostupna zbog radova.
                  </p>
                  <p className="items-baseline gap-1 text-dark dark:text-light max-w-[75ch] text-center">
                    Za termine i upite slobodno nas kontaktirajte putem{" "}
                    <Button
                      variant="none"
                      className="p-0! text-sm underline! inline!"
                      href="https://wa.me/+385977588716"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Whatsapp"
                    >
                      Whatsappa
                    </Button>
                    , broja telefona{" "}
                    <Button
                      variant="none"
                      className="p-0! text-sm underline! inline!"
                      href="tel:+385977588716"
                    >
                      +385 97 758 8716
                    </Button>{" "}
                    ili na mail{" "}
                    <Button
                      variant="none"
                      className="p-0! text-sm underline! inline!"
                      href="mailto:4d.detailing.ln@gmail.com"
                    >
                      4d.detailing.ln@gmail.com
                    </Button>
                    . Uskoro smo opet online!
                  </p>
                </div>
              </div>
            }
          />
        </Routes>
      </Suspense>
      {/* <GoogleAnalytics /> */}
      {/* <ToastContainer autoClose={2500} closeOnClick /> */}
      {/* <Footer /> */}
    </BrowserRouter>
  );
};

const App: React.FC = () => (
  <DataProvider>
    <AppRoutes />
  </DataProvider>
);

export default App;
