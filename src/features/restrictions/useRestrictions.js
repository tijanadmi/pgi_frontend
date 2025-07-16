import { useQuery } from "@tanstack/react-query";
import { getRestrictions } from "../../services/apiRestrictions";

export function useRestrictions() {
  const {
    isLoading,
    data: restrictions,
    error,
  } = useQuery({
    queryKey: ["restrictions"],
    queryFn: getRestrictions,
  });

  return { isLoading, error, restrictions };
}