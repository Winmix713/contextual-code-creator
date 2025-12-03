import { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import type { AdminRole } from "@/types/admin";

interface RoleGateProps {
  children: ReactNode;
  allowedRoles: AdminRole[];
  fallback?: ReactNode;
}

export const RoleGate = ({ children, allowedRoles, fallback }: RoleGateProps) => {
  const { user } = useAuth();
  
  const userRole = (user?.user_metadata?.role as AdminRole) ?? "user";
  
  if (!allowedRoles.includes(userRole)) {
    return fallback ?? null;
  }
  
  return <>{children}</>;
};

export default RoleGate;
