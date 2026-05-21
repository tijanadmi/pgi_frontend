import { useQuery } from "@tanstack/react-query";
import { getOrgs } from "../../services/apiLOVs";

export function useOrgs() {
  const {
    isLoading,
    data: orgs,
    error,
  } = useQuery({
    queryKey: ["orgs"],
    queryFn: getOrgs,
  });

  return { isLoading, error, orgs };
}
