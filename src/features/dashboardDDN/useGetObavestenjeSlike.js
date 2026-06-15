import { useQuery } from "@tanstack/react-query";
import { getObavSlikeByDogId } from "../../services/apiShifts";

/**
 * Custom hook za dohvat slika obaveštenja po ID događaja
 * @param {number} dogId - ID događaja
 */
export function useGetObavestenjeSlike(dogId) {
  const {
    isLoading,
    data: obavestenjeSlike = [], // default prazna lista
    error,
  } = useQuery({
    queryKey: ["obavestenjeSlike", dogId],
    queryFn: () => getObavSlikeByDogId(dogId),
    enabled: !!dogId, // ne poziva ako nema ID
  });

  return { isLoading, error, obavestenjeSlike };
}