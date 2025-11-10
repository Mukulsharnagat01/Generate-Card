import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const RequireAuth = () => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return (
    <div className="min-h-[40vh] flex items-center justify-center text-sm text-muted-foreground">Loading…</div>
  );
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  return <Outlet />;
};

export const RequireAdmin = () => {
  const { profile, loading } = useAuth();
  const location = useLocation();
  if (loading) return (
    <div className="min-h-[40vh] flex items-center justify-center text-sm text-muted-foreground">Checking permissions…</div>
  );
  if (profile?.role !== "admin") return <Navigate to="/" replace state={{ from: location }} />;
  return <Outlet />;
};
