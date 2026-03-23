import { useQuery } from "@tanstack/react-query";
import { getPodUzrokPrek } from "../../services/apiLOVs";

export function usePodUzrokPrek(uzrokPrekId) {
  const {
    isLoading,
    data: poduzrokprek,
    error,
  } = useQuery({
   queryKey: ["poduzrokprek", uzrokPrekId],
    queryFn: () => getPodUzrokPrek(uzrokPrekId),
    enabled: !!uzrokPrekId,
  });

  return { isLoading, error, poduzrokprek };
}
