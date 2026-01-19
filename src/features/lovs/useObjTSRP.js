import { useQuery } from "@tanstack/react-query";
import { getObjTSRP } from "../../services/apiLOVs";

export function useObjTSRP(mrcId) {
  const {
    isLoading,
    data: objTSRP,
    error,
  } = useQuery({
    queryKey: ["objTSRP", mrcId],
    queryFn: () => getObjTSRP(mrcId),
    enabled: !!mrcId, // 🔥 API se zove samo kad je MRC izabran
  });

  return { isLoading, error, objTSRP };
}
