import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getT3ForDayForPaginationPI } from "../../services/apiPI";

export function useT3ForDayPI() {
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

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // const queryDate = subDays(new Date(), numDays).toISOString();

  //MRC
  const mrcId = !searchParams.get("mrcId")
    ? 1
    : Number(searchParams.get("mrcId"));

  const {
    isLoading,
    data: { data: dogadjaji3, count } = { data: [], count: 0 },
  } = useQuery({
    queryFn: () => getT3ForDayForPaginationPI(day, mrcId, page),
    queryKey: ["dogadjaji3", day, mrcId, page],
  });

  return { isLoading, dogadjaji3, day, mrcId, count };
}
