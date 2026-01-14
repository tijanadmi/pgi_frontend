import { useQuery } from "@tanstack/react-query";
import { getVrstaPrek } from "../../services/apiLOVs";

export function useVrstaPrek() {
  const {
    isLoading,
    data: vrstaprek,
    error,
  } = useQuery({
    queryKey: ["vrstaprek"],
    queryFn: getVrstaPrek,
  });

  return { isLoading, error, vrstaprek };
}
