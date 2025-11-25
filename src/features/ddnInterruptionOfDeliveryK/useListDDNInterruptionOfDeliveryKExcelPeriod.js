import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getListDDNInterruptionOfDeliveryKExcelPeriod } from "../../services/apiDDNInterruptionOfDeliveryK";

export function useListDDNInterruptionOfDeliveryKExcelPeriod() {
  const [searchParams] = useSearchParams();

   // DATE PARAMS (uvek postoje jer ih RangeDateSelect postavlja pri mount-u)
  const firstDay = searchParams.get("first_day");
  const lastDay = searchParams.get("last_day");



  //MRC
  const mrcId = !searchParams.get("mrcId")
    ? 1
    : Number(searchParams.get("mrcId"));

  // QUERY
  const {
    isLoading,
    data: { data: prekidik, count } = { data: [], count: 0 }, // Podrazumevane vrednosti
    error,
  } = useQuery({
    queryKey: ["prekidik", firstDay, lastDay, mrcId],
    queryFn: () => getListDDNInterruptionOfDeliveryKExcelPeriod(firstDay, lastDay, mrcId),
    enabled: Boolean(firstDay && lastDay),
  });

  // console.log("reservations", reservations)
  return { isLoading, error, prekidik, count };
}
