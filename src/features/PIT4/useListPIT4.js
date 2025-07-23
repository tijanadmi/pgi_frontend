import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getT4ForDayPI } from "../../services/apiPI";

export function useListPIT4() {
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

  // QUERY
  const {
    isLoading,
    data: { data: dogadjaji, count } = { data: [], count: 0 }, // Podrazumevane vrednosti
    error,
  } = useQuery({
    queryKey: ["dogadjaji", day, mrcId],
    queryFn: () => getT4ForDayPI(day, mrcId),
  });

  // console.log("T4 u useListDayT4", dogadjaji);
  return { isLoading, error, dogadjaji, count };
}
