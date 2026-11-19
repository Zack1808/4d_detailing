import { Outlet, useLocation } from "react-router-dom";

import CookieConsent from "../analytics/CookieConsent";
import ErrorBoundary from "./ErrorBoundary";
import Footer from "./Footer";
import Navigation from "./Navigation";

import { DataProvider } from "../../context/DataContext";

const PublicLayout = () => {
  const { pathname } = useLocation();

  return (
    <>
      <DataProvider>
        <a
          href="#main"
          className="fixed top-3 left-3 z-80 -translate-y-24 rounded-xs bg-dark px-4 py-3 font-medium text-light transition-transform focus:translate-y-0 dark:bg-light dark:text-dark"
        >
          Preskoči na sadržaj
        </a>
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
