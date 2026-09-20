import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { DataProvider, useData } from "./context/DataContext";

import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import PageLoader from "./components/layout/PageLoader";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Error404 = lazy(() => import("./pages/Error404"));

const AppRoutes: React.FC = () => {
  const { isDark } = useData();

  return (
    <BrowserRouter>
      <Navigation />
      <Suspense fallback={<PageLoader isDark={isDark} />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/usluge" element={<Services />} />
          <Route path="/kontakt" element={<Contact />} />
          <Route path="/pravila-privatnosti" element={<Privacy />} />
          <Route path="/uvijeti-koristenja" element={<Terms />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Suspense>
      <ToastContainer />
      <Footer />
    </BrowserRouter>
  );
};

const App: React.FC = () => (
  <DataProvider>
    <AppRoutes />
  </DataProvider>
);

export default App;
