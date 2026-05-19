import { useQuery } from "@tanstack/react-query";
import { getIspadById } from "../../services/apiShifts";

/**
 * Custom hook za dohvat jednog događaja ispad po ID
 * @param {number} dogId - ID događaja
 */
export function useGetIspad(dogId) {
  const {
    isLoading,
    data: ispad = null, // default vrednost ako još nije učitano
    error,
  } = useQuery({
    queryKey: ["ispad", dogId],
    queryFn: () => getIspadById(dogId),
    enabled: !!dogId, // hook se neće pozivati ako dogId nije validan
  });

  return { isLoading, error, ispad };
}