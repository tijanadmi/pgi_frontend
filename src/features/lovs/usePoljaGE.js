import { useQuery } from "@tanstack/react-query";
import { getPoljaGE } from "../../services/apiLOVs";

export function usePoljaGE(obId) {
  const {
    isLoading,
    data: poljaGE,
    error,
  } = useQuery({
    queryKey: ["poljaGE", obId],
    queryFn: () => getPoljaGE(obId),
    enabled: !!obId, // 🔥 API se zove samo kad je objekat izabran
  });

  return { isLoading, error, poljaGE };
}
