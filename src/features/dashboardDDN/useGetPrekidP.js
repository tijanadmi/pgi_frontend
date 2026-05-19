import { useQuery } from "@tanstack/react-query";
import { getPrekidPById } from "../../services/apiShifts";

/**
 * Custom hook za dohvat jednog događaja prekidp po ID
 * @param {number} dogId - ID događaja
 */
export function useGetPrekidP(dogId) {
  const {
    isLoading,
    data: prekidp = null, // default vrednost ako još nije učitano
    error,
  } = useQuery({
    queryKey: ["prekidp", dogId],
    queryFn: () => getPrekidPById(dogId),
    enabled: !!dogId, // hook se neće pozivati ako dogId nije validan
  });

  return { isLoading, error, prekidp };
}