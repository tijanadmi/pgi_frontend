import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getListDDNInterruptionOfDeliveryKPeriod } from "../../services/apiDDNInterruptionOfDeliveryK";

export function useListDDNInterruptionOfDeliveryKPeriod() {

const [searchParams] = useSearchParams();
  // DAY (format: dd.mm.yyyy)
  const firstDayParam = searchParams.get("first_day");

  // Fallback na jučerašnji dan ako "day" nije prosleđen
//   const yesterday = new Date();
//   yesterday.setDate(yesterday.getDate() - 1);

//   const fallbackDay = `${String(yesterday.getDate()).padStart(2, "0")}.${String(
//     yesterday.getMonth() + 1
//   ).padStart(2, "0")}.${yesterday.getFullYear()}`;

//   const firstDay = firstDayParam || fallbackDay;

//   const lastDayParam = searchParams.get("last_day");

//   // Fallback na jučerašnji dan ako "day" nije prosleđen
//   const today = new Date();


//   const fallbackLastDay = `${String(today.getDate()).padStart(2, "0")}.${String(
//     today.getMonth() + 1
//   ).padStart(2, "0")}.${today.getFullYear()}`;

//   const lastDay = lastDayParam || fallbackLastDay;

 // DATE PARAMS (uvek postoje jer ih RangeDateSelect postavlja pri mount-u)
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
    data: { data: prekidik, count } = { data: [], count: 0 }, // Podrazumevane vrednosti
    error,
  } = useQuery({
    queryKey: ["prekidik", firstDay, lastDay, mrcId, page],
    queryFn: () => getListDDNInterruptionOfDeliveryKPeriod(firstDay, lastDay, mrcId, page),
  });

  // console.log("reservations", reservations)
  return { isLoading, error, prekidik, count };
}
