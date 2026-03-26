import { useQuery } from "@tanstack/react-query";
import { getObavestenjeBeleskaById } from "../../services/apiShifts";

/**
 * Custom hook za dohvat jednog događaja obaveštenja tipa beleska po ID
 * @param {number} dogId - ID događaja
 */
export function useGetObavestenjeBeleska(dogId) {
  const {
    isLoading,
    data: obavestenjeBeleska = null, // default vrednost ako još nije učitano
    error,
  } = useQuery({
    queryKey: ["obavestenjeBeleska", dogId],
    queryFn: () => getObavestenjeBeleskaById(dogId),
    enabled: !!dogId, // hook se neće pozivati ako dogId nije validan
  });

  return { isLoading, error, obavestenjeBeleska };
}