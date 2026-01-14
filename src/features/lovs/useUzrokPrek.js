import { useQuery } from "@tanstack/react-query";
import { getUzrokPrek } from "../../services/apiLOVs";

export function useUzrokPrek() {
  const {
    isLoading,
    data: uzrokprek,
    error,
  } = useQuery({
    queryKey: ["uzrokprek"],
    queryFn: getUzrokPrek,
  });

  return { isLoading, error, uzrokprek };
}
