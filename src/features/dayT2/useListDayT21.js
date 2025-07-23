import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getT2ForDayForPagination } from "../../services/apiDD";

export function useListDayT2() {
  const [searchParams] = useSearchParams();

  // DAY (format: dd.mm.yyyy)
  const dayParam = searchParams.get("day");

  // Fallback na jučerašnji dan ako "day" nije prosleđen
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const fallbackDay = `${String(yesterday.getDate()).padStart(2, "0")}.${String(
    yesterday.getMonth() + 1
  ).padStart(2, "0")}.${yesterday.getFullYear()}`;

  const day = dayParam || fallbackDay;

  //MRC
  const mrcId = !searchParams.get("mrcId")
    ? 1
    : Number(searchParams.get("mrcId"));

  // FILTER
  const filter = searchParams.get("funp");

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // QUERY
  const {
    isLoading,
    data: { data: dogadjaji, count } = { data: [], count: 0 }, // Podrazumevane vrednosti
    error,
  } = useQuery({
    queryKey: ["dogadjaji", day, mrcId, page, filter],
    queryFn: () => getT2ForDayForPagination(day, mrcId, page, filter),
  });

  // console.log("reservations", reservations)
  return { isLoading, error, dogadjaji, count };
}
