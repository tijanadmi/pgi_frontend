import { useQuery } from "@tanstack/react-query";
import { getAngazovaniRukById } from "../../services/apiShifts";

/**
 * Custom hook za dohvat jednog događaja angazovani rukovaoci po ID
 * @param {number} dogId - ID događaja
 */
export function useAngazovaniRuk(dogId) {
  const {
    isLoading,
    data: angazovaniRuk = null, // default vrednost ako još nije učitano
    error,
  } = useQuery({
    queryKey: ["angazovaniRuk", dogId],
    queryFn: () => getAngazovaniRukById(dogId),
    enabled: !!dogId, // hook se neće pozivati ako dogId nije validan
  });

  return { isLoading, error, angazovaniRuk };
}