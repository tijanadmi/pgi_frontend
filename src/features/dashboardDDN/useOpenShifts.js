import { useQuery } from "@tanstack/react-query";
import { getOpenShifts } from "../../services/apiShifts";

export function useOpenShifts() {
  const {
    isLoading,
    data: openShifts = [], // Podrazumevane vrednosti
    error,
  } = useQuery({
    queryKey: ["openShifts"],
    queryFn: getOpenShifts,
  });

  return { isLoading, error, openShifts };
}