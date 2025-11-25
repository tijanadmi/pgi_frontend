import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getListDDNInterruptionOfDeliveryPPeriod } from "../../services/apiDDNInterruptionOfDeliveryP";

export function useListDDNInterruptionOfDeliveryPPeriod() {
  const [searchParams] = useSearchParams();

//   let month = Number(searchParams.get("month")) || 0;
//   let year = Number(searchParams.get("year")) || 0;

//   if (month === 0 || year === 0) {
//     const today = new Date();

//     if (month === 0) {
//       month = today.getMonth() === 0 ? 12 : today.getMonth();
//     }

//     if (year === 0) {
//       year =
//         today.getMonth() === 0 ? today.getFullYear() - 1 : today.getFullYear();
//     }
//   }

  const firstDay = searchParams.get("first_day");
  const lastDay = searchParams.get("last_day");
  
  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  //MRC
  const mrcId = !searchParams.get("mrcId")
    ? 1
    : Number(searchParams.get("mrcId"));

  // QUERY
  const {
    isLoading,
    data: { data: prekidip, count } = { data: [], count: 0 }, // Podrazumevane vrednosti
    error,
  } = useQuery({
    queryKey: ["prekidip", firstDay, lastDay, mrcId, page],
    queryFn: () => getListDDNInterruptionOfDeliveryPPeriod(firstDay, lastDay, mrcId, page),
    enabled: Boolean(firstDay && lastDay),
  });

  // console.log("reservations", reservations)
  return { isLoading, error, prekidip, count };
}
