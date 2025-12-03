import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth, type UserRole } from "@/providers/AuthProvider";
import PageLoading from "@/components/ui/PageLoading";

interface AuthGateProps {
  children: ReactNode;
  requiredRoles?: UserRole[];
  allowedRoles?: string[]; // Alias for requiredRoles
  fallback?: ReactNode;
  redirectTo?: string;
}

const AuthGate = ({
  children,
  requiredRoles = [],
  allowedRoles,
  fallback,
  redirectTo = "/login",
}: AuthGateProps) => {
  const { user, loading, hasAnyRole } = useAuth();
  
  // Use allowedRoles as alias for requiredRoles
  const roles = allowedRoles ? allowedRoles as UserRole[] : requiredRoles;

  if (loading) {
    return fallback || <PageLoading message="Jogosultságok ellenőrzése..." />;
  }

  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  if (roles.length > 0 && !hasAnyRole(roles)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default AuthGate;
