import { useQuery } from "@tanstack/react-query";
// import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import {getDApuA } from "../../services/apiZastita";

export function useDApuAForYear() {
  const [searchParams] = useSearchParams();

  let year = Number(searchParams.get("year")) || 0;

  if (year === 0) {
    const today = new Date();

    if (year === 0) {
      year =
        today.getMonth() === 0 ? today.getFullYear() - 1 : today.getFullYear();
    }
  }
  // const queryDate = subDays(new Date(), numDays).toISOString();



  const {
    isLoading,
    data:dataApuA,
  } = useQuery({
    queryFn: () => getDApuA(year),
    queryKey: ["dataApuA", year],
  });

 
  return { isLoading, dataApuA, year, };
}
