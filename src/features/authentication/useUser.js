import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  //const access_token=localStorage.getItem('token');

  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  // Provera da li korisnik ima rolu "PGI"
  // const isAuthenticated =
  //   user?.user_role?.some((role) => role.RoleCode === "PGI") || false;

  // Proveri da li korisnik ima rolu "PGI"
  const isAuthenticated =
    Array.isArray(user?.user_role) && user.user_role.includes("PGI");
  return { isLoading, user, isAuthenticated };
}
