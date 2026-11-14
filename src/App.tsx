import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Suspense } from "react";

import ErrorBoundary from "./components/layout/ErrorBoundary";
import PublicLayout from "./components/layout/PublicLayout";
import ScrollToTop from "./components/layout/ScrollToTop";
import Toaster from "./components/ui/Toast";
import AdminLoginSkeleton from "./components/skeletons/AdminLoginSkeleton";
import AdminShellSkeleton from "./components/skeletons/AdminShellSkeleton";

import { PATHS } from "./config/paths";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import PriceArchive from "./pages/PriceArchive";
import Privacy from "./pages/Privacy";
import Services from "./pages/Services";
import Terms from "./pages/Terms";

import { AdminApp } from "./pageLoaders";
import { ADMIN_PATHS } from "./admin/paths";

const AdminFallback = () => {
  const { pathname } = useLocation();

  return pathname.startsWith(ADMIN_PATHS.login) ? (
    <AdminLoginSkeleton />
  ) : (
    <AdminShellSkeleton />
  );
};

const App = () => (
  <ErrorBoundary>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path={`${PATHS.admin}/*`}
          element={
            <Suspense fallback={<AdminFallback />}>
              <AdminApp />
            </Suspense>
          }
        />

        <Route element={<PublicLayout />}>
          <Route path={PATHS.home} element={<Home />} />
          <Route path={PATHS.services} element={<Services />} />
          <Route path={PATHS.contact} element={<Contact />} />
          <Route path={PATHS.priceArchive} element={<PriceArchive />} />
          <Route path={PATHS.privacy} element={<Privacy />} />
          <Route path={PATHS.terms} element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  </ErrorBoundary>
);

export default App;
