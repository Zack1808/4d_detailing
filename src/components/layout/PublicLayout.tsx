import { Outlet, useLocation } from "react-router-dom";

import CookieConsent from "../analytics/CookieConsent";
import ErrorBoundary from "./ErrorBoundary";
import Footer from "./Footer";
import Navigation from "./Navigation";
import RouteSEO from "../seo/RouteSEO";

import { DataProvider } from "../../context/DataContext";

const PublicLayout = () => {
  const { pathname } = useLocation();

  return (
    <>
      <RouteSEO />
      <DataProvider>
        <Navigation />
        <ErrorBoundary key={pathname}>
          <Outlet />
        </ErrorBoundary>
        <CookieConsent />
        <Footer />
      </DataProvider>
    </>
  );
};

export default PublicLayout;
