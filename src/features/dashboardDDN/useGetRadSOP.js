import { useQuery } from "@tanstack/react-query";
import { getRadSOPById } from "../../services/apiShifts";

/**
 * Custom hook za dohvat jednog događaja rad sop po ID
 * @param {number} dogId - ID događaja
 */
export function useGetRadSOP(dogId) {
  const {
    isLoading,
    data: radsop = null, // default vrednost ako još nije učitano
    error,
  } = useQuery({
    queryKey: ["radsop", dogId],
    queryFn: () => getRadSOPById(dogId),
    enabled: !!dogId, // hook se neće pozivati ako dogId nije validan
  });

  return { isLoading, error, radsop };
}