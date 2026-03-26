import { useQuery } from "@tanstack/react-query";
import { getIskljucenjeById } from "../../services/apiShifts";

/**
 * Custom hook za dohvat jednog događaja isključenja po ID
 * @param {number} dogId - ID događaja
 */
export function useGetIskljucenje(dogId) {
  const {
    isLoading,
    data: iskljucenje = null, // default vrednost ako još nije učitano
    error,
  } = useQuery({
    queryKey: ["iskljucenje", dogId],
    queryFn: () => getIskljucenjeById(dogId),
    enabled: !!dogId, // hook se neće pozivati ako dogId nije validan
  });

  return { isLoading, error, iskljucenje };
}