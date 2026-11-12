import { Navigate, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./auth/AuthContext";
import RequireAdmin from "./auth/RequireAdmin";

import AdminLayout from "./layout/AdminLayout";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

import { ADMIN_SEGMENTS } from "./paths";

const AdminApp = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path={ADMIN_SEGMENTS.login} element={<LoginPage />} />

        <Route element={<RequireAdmin />}>
          <Route element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="*" element={<Navigate to="." replace />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default AdminApp;
