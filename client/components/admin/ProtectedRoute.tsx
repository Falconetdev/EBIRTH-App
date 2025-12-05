import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAdminAuth } from "@/context/AdminAuthContext";

const ProtectedRoute = () => {
  const { user, loading } = useAdminAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-gradient-to-br from-[#090014] via-[#1a0b2e] to-[#2c0f42] text-white">
        <p className="text-sm text-white/70">Checking access…</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
