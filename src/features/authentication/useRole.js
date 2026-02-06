// features/authentication/useRole.js
import { useUser } from "./useUser";

export function useRole() {
  const { user, isLoading } = useUser();

  // Provera role
  const hasRole = (roleCode) => {
    return Array.isArray(user?.user_role) && user.user_role.includes(roleCode);
  };

  // Ako želiš, možeš definisati često korišćene role
  const isBI = hasRole("BI");
  const isPGI = hasRole("PGI");
  const isAdmin = hasRole("ADMIN");

  return { user, isLoading, hasRole, isBI, isPGI, isAdmin };
}
