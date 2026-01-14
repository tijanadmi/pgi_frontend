import { useQuery } from "@tanstack/react-query";
import { getPodVrstaPrek } from "../../services/apiLOVs";

export function usePodVrstaPrek() {
  const {
    isLoading,
    data: podvrstaprek,
    error,
  } = useQuery({
    queryKey: ["podvrstaprek"],
    queryFn: getPodVrstaPrek,
  });

  return { isLoading, error, podvrstaprek };
}
