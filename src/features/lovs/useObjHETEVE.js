import { useQuery } from "@tanstack/react-query";
import { getObjHETEVE } from "../../services/apiLOVs";

export function useObjHETEVE(mrcId) {
  const {
    isLoading,
    data: objHETEVE,
    error,
  } = useQuery({
    queryKey: ["objHETEVE", mrcId],
    queryFn: () => getObjHETEVE(mrcId),
    enabled: !!mrcId, // 🔥 API se zove samo kad je MRC izabran
  });

  return { isLoading, error, objHETEVE };
}
