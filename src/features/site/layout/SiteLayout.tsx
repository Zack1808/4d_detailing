import React from "react";
import { Outlet } from "react-router-dom";

import Navigation from "@/features/site/components/Navigation";
import Footer from "@/features/site/components/Footer";
import GoogleAnalytics from "@/shared/components/GoogleAnalytics";

import { CatalogProvider } from "@/features/catalog/context/CatalogContext";

const SiteLayout: React.FC = () => {
  return (
    <CatalogProvider>
      <Navigation />
      <Outlet />
      <GoogleAnalytics />
      <Footer />
    </CatalogProvider>
  );
};

export default SiteLayout;
