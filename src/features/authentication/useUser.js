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
  const isAuthenticated =
    user?.user_role?.some((role) => role.RoleCode === "PGI") || false;
  return { isLoading, user, isAuthenticated };
}
