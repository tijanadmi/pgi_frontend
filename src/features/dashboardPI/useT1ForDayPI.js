import { useQuery } from "@tanstack/react-query";
// import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getT1ForDayPI } from "../../services/apiPI";

export function useT1ForDayPI() {
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

  const {
    isLoading,
    data: { data: dogadjaji, count } = { data: [], count: 0 },
  } = useQuery({
    queryFn: () => getT1ForDayPI(day, mrcId),
    queryKey: ["dogadjaji", day, mrcId],
  });

  return { isLoading, dogadjaji, day, mrcId, count };
}
