import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";

import {
  AuthProvider,
  useAdminAuth,
} from "@/features/auth/context/AuthContext";

import Login from "@features/admin/pages/Login";
import Dashboard from "@features/admin/pages/Dashboard";
import Services from "@features/admin/pages/Services";
import Reviews from "@features/admin/pages/Reviews";
import Appointments from "@features/admin/pages/Appointments";
import Analytics from "../pages/Analytics";

import Navigation from "@features/admin/components/Navigation";

const ProtectedRoute = () => {
  const { user } = useAdminAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

const AdminLayout = () => {
  return (
    <div className="flex xl:flex-row flex-col w-full">
      <Navigation />
      <Outlet />
    </div>
  );
};

const AdminRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="analitika" element={<Analytics />} />
            <Route path="usluge" element={<Services />} />
            <Route path="recenzije" element={<Reviews />} />
            <Route path="termini" element={<Appointments />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </AuthProvider>
  );
};

export default AdminRoutes;
