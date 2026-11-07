import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";

import CookieConsent from "../analytics/CookieConsent";
import ErrorBoundary from "./ErrorBoundary";
import Footer from "./Footer";
import Navigation from "./Navigation";
import PageLoader from "./PageLoader";

import { DataProvider } from "../../context/DataContext";

const PublicLayout = () => {
  const { pathname } = useLocation();

  return (
    <DataProvider>
      <Navigation />
      <ErrorBoundary key={pathname}>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>
      <CookieConsent />
      <Footer />
    </DataProvider>
  );
};

export default PublicLayout;
