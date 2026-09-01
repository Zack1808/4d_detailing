import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Contact from "./pages/Contact";
import Error404 from "./pages/Error404";
import Home from "./pages/Home";
import Privacy from "./pages/Privacy";
import Services from "./pages/Services";
import Terms from "./pages/Terms";

import Navigation from "./components/layout/Navigation";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/usluge" element={<Services />} />
        <Route path="/kontakt" element={<Contact />} />
        <Route path="/pravila-privatnosti" element={<Privacy />} />
        <Route path="/uvijeti-koristenja" element={<Terms />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
