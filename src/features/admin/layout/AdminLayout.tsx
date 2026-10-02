import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";

import {
  AuthProvider,
  useAdminAuth,
} from "@/features/auth/context/AuthContext";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

const ProtectedRoute = () => {
  const { user } = useAdminAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

const AdminRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </AuthProvider>
  );
};

export default AdminRoutes;
