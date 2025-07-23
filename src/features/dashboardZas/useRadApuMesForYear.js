import { useQuery } from "@tanstack/react-query";
// import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import {getRadApuMes } from "../../services/apiZastita";

export function useRadApuMesForYear() {
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
    data:dogadjaji,
  } = useQuery({
    queryFn: () => getRadApuMes(year),
    queryKey: ["dogadjaji", year],
  });

 
  return { isLoading, dogadjaji, year, };
}
