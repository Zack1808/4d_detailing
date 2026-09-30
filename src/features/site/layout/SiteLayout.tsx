import React from "react";
import { Outlet } from "react-router-dom";

import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import GoogleAnalytics from "@/components/common/GoogleAnalytics";

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
