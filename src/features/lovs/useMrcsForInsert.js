import { useQuery } from "@tanstack/react-query";
import { getMrcsForInsert } from "../../services/apiLOVs";

export function useMrcsForInsert() {
  const {
    isLoading,
    data: mrcs,
    error,
  } = useQuery({
    queryKey: ["mrcs"],
    queryFn: getMrcsForInsert,
  });

  return { isLoading, error, mrcs };
}
