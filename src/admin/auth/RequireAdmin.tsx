import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "./AuthContext";

import PageLoader from "../../components/layout/PageLoader";

import { ADMIN_PATHS } from "../paths";

const RequireAdmin = () => {
  const { status } = useAuth();
  const location = useLocation();

  if (status === "loading") return <PageLoader />;

  if (status === "unauthenticated") {
    return (
      <Navigate to={ADMIN_PATHS.login} replace state={{ from: location }} />
    );
  }

  return <Outlet />;
};

export default RequireAdmin;
