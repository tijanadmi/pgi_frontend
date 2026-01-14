import { useQuery } from "@tanstack/react-query";
import { getTipPrek } from "../../services/apiLOVs";

export function useTipPrek() {
  const {
    isLoading,
    data: tipprek,
    error,
  } = useQuery({
    queryKey: ["tipprek"],
    queryFn: getTipPrek,
  });

  return { isLoading, error, tipprek };
}
