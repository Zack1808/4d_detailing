import { Navigate, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./auth/AuthContext";
import RequireAdmin from "./auth/RequireAdmin";

import AdminLayout from "./layout/AdminLayout";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ReviewsPage from "./pages/ReviewsPage";
import PriceTablesPage from "./pages/PriceTablesPage";
import BlockedDatesPage from "./pages/BlockedDates";
import AppointmentsPage from "./pages/AppointmentsPage";
import ServicesPage from "./pages/ServicesPage";

import { ADMIN_SEGMENTS } from "./paths";

const AdminApp = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path={ADMIN_SEGMENTS.login} element={<LoginPage />} />

        <Route element={<RequireAdmin />}>
          <Route element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route
              path={ADMIN_SEGMENTS.appointments}
              element={<AppointmentsPage />}
            />
            <Route path={ADMIN_SEGMENTS.services} element={<ServicesPage />} />
            <Route path={ADMIN_SEGMENTS.reviews} element={<ReviewsPage />} />
            <Route
              path={ADMIN_SEGMENTS.blockedDates}
              element={<BlockedDatesPage />}
            />
            <Route
              path={ADMIN_SEGMENTS.priceTables}
              element={<PriceTablesPage />}
            />
            <Route path="*" element={<Navigate to="." replace />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default AdminApp;
