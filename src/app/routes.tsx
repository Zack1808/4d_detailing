import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import SiteLayout from "@/features/site/layout/SiteLayout";
import Home from "@features/site/pages/Home";
import Services from "@features/site/pages/Services";
import Contact from "@features/site/pages/Contact";
import Privacy from "@features/site/pages/Privacy";
import Terms from "@features/site/pages/Terms";
import Error404 from "@features/site/pages/Error404";

const AdminRoutes = lazy(() => import("@features/admin/layout/AdminLayout"));

import PageLoader from "@/shared/components/PageLoader";

import { useTheme } from "@/shared/context/ThemeContext";

const AppRoutes: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/usluge" element={<Services />} />
          <Route path="/kontakt" element={<Contact />} />
          <Route path="/pravila-privatnosti" element={<Privacy />} />
          <Route path="/uvijeti-koristenja" element={<Terms />} />
          <Route path="*" element={<Error404 />} />
          <Route
            path="/admin"
            element={<Navigate to="/admin/login" replace />}
          />
          <Route
            path="/admin/*"
            element={
              <Suspense fallback={<PageLoader isDark={isDark} />}>
                <AdminRoutes />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
