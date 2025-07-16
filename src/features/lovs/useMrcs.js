import { useQuery } from "@tanstack/react-query";
import { getMrcs } from "../../services/apiLOVs";

export function useMrcs() {
  const {
    isLoading,
    data: mrcs,
    error,
  } = useQuery({
    queryKey: ["mrcs"],
    queryFn: getMrcs,
  });

  return { isLoading, error, mrcs };
}
