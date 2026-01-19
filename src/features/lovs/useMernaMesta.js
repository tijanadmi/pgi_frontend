import { useQuery } from "@tanstack/react-query";
import { getMernaMesta } from "../../services/apiLOVs";

export function useMernaMesta() {
  const {
    isLoading,
    data: mernaMesta,
    error,
  } = useQuery({
    queryKey: ["mernaMesta"],
    queryFn: getMernaMesta,
  });

  return { isLoading, error, mernaMesta };
}
