import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { DataProvider, useData } from "./context/DataContext";

import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import PageLoader from "./components/layout/PageLoader";

import GoogleAnalytics from "./components/common/GoogleAnalytics";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

const PriceArchive = lazy(() => import("./pages/PriceArchive"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Error404 = lazy(() => import("./pages/Error404"));

const AppRoutes: React.FC = () => {
  const { isDark } = useData();

  return (
    <>
      <Navigation />
      <Suspense fallback={<PageLoader isDark={isDark} />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/usluge" element={<Services />} />
          <Route path="/kontakt" element={<Contact />} />
          <Route path="/arhiva-cijenika" element={<PriceArchive />} />
          <Route path="/pravila-privatnosti" element={<Privacy />} />
          <Route path="/uvijeti-koristenja" element={<Terms />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Suspense>
      <GoogleAnalytics />
      <ToastContainer autoClose={2500} closeOnClick />
      <Footer />
    </>
  );
};

const App: React.FC = () => (
  <BrowserRouter>
    <DataProvider>
      <AppRoutes />
    </DataProvider>
  </BrowserRouter>
);

export default App;
