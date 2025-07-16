import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getT4ForDay } from "../../services/apiDD";

export function useT4ForDay() {
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

  // const queryDate = subDays(new Date(), numDays).toISOString();

  //MRC
  const mrcId = !searchParams.get("mrcId")
    ? 1
    : Number(searchParams.get("mrcId"));

  const {
    isLoading,
    data: { data: dogadjaji4, count } = { data: [], count: 0 },
  } = useQuery({
    queryFn: () => getT4ForDay(day, mrcId),
    queryKey: ["dogadjaji4", day, mrcId],
  });

  return { isLoading, dogadjaji4, day, mrcId, count };
}
