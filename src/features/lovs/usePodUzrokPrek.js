import { useQuery } from "@tanstack/react-query";
import { getPodUzrokPrek } from "../../services/apiLOVs";

export function usePodUzrokPrek() {
  const {
    isLoading,
    data: poduzrokprek,
    error,
  } = useQuery({
    queryKey: ["poduzrokprek"],
    queryFn: getPodUzrokPrek,
  });

  return { isLoading, error, poduzrokprek };
}
