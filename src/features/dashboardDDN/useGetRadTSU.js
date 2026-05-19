import { useQuery } from "@tanstack/react-query";
import { getRadTSUById } from "../../services/apiShifts";

/**
 * Custom hook za dohvat jednog događaja rad tsu po ID
 * @param {number} dogId - ID događaja
 */
export function useGetRadTSU(dogId) {
  const {
    isLoading,
    data: radtsu = null, // default vrednost ako još nije učitano
    error,
  } = useQuery({
    queryKey: ["radtsu", dogId],
    queryFn: () => getRadTSUById(dogId),
    enabled: !!dogId, // hook se neće pozivati ako dogId nije validan
  });

  return { isLoading, error, radtsu };
}