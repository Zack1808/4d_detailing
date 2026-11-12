import { Navigate, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./auth/AuthContext";
import RequireAdmin from "./auth/RequireAdmin";

import AdminLayout from "./layout/AdminLayout";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ReviewsPage from "./pages/ReviewsPage";
import PriceTablesPage from "./pages/PriceTablesPage";

import { ADMIN_SEGMENTS } from "./paths";

const AdminApp = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path={ADMIN_SEGMENTS.login} element={<LoginPage />} />

        <Route element={<RequireAdmin />}>
          <Route element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path={ADMIN_SEGMENTS.reviews} element={<ReviewsPage />} />
            <Route path="*" element={<Navigate to="." replace />} />
            <Route
              path={ADMIN_SEGMENTS.priceTables}
              element={<PriceTablesPage />}
            />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default AdminApp;
