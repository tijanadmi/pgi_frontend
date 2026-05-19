import { useQuery } from "@tanstack/react-query";
import { getRadTKById } from "../../services/apiShifts";

/**
 * Custom hook za dohvat jednog događaja rad tk po ID
 * @param {number} dogId - ID događaja
 */
export function useGetRadTK(dogId) {
  const {
    isLoading,
    data: radtk = null, // default vrednost ako još nije učitano
    error,
  } = useQuery({
    queryKey: ["radtk", dogId],
    queryFn: () => getRadTKById(dogId),
    enabled: !!dogId, // hook se neće pozivati ako dogId nije validan
  });

  return { isLoading, error, radtk };
}