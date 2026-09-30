import React from "react";
import { Routes, Route } from "react-router-dom";

import SiteLayout from "@/features/site/layout/SiteLayout";
import Home from "../pages/Home";
import Services from "../pages/Services";
import Contact from "../pages/Contact";
import Privacy from "../pages/Privacy";
import Terms from "../pages/Terms";
import Error404 from "../pages/Error404";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route element={<SiteLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/usluge" element={<Services />} />
      <Route path="/kontakt" element={<Contact />} />
      <Route path="/pravila-privatnosti" element={<Privacy />} />
      <Route path="/uvijeti-koristenja" element={<Terms />} />
      <Route path="*" element={<Error404 />} />
    </Route>
  </Routes>
);

export default AppRoutes;
