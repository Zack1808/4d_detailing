import React from "react";
import { Outlet } from "react-router-dom";

import Navigation from "@/features/site/components/Navigation";
import Footer from "@/features/site/components/Footer";
import GoogleAnalytics from "@/shared/components/GoogleAnalytics";

const SiteLayout: React.FC = () => {
  return (
    <>
      <Navigation />
      <Outlet />
      <GoogleAnalytics />
      <Footer />
    </>
  );
};

export default SiteLayout;
