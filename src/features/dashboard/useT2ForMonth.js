import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getT2ForMonthForPagination } from "../../services/apiMM";

export function useT2ForMonth() {
  const [searchParams] = useSearchParams();

  let month = Number(searchParams.get("month")) || 0;
  let year = Number(searchParams.get("year")) || 0;

  if (month === 0 || year === 0) {
    const today = new Date();

    if (month === 0) {
      month = today.getMonth() === 0 ? 12 : today.getMonth();
    }

    if (year === 0) {
      year =
        today.getMonth() === 0 ? today.getFullYear() - 1 : today.getFullYear();
    }
  }

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // const queryDate = subDays(new Date(), numDays).toISOString();

  const {
    isLoading,
    data: { data: dogadjaji2, count } = { data: [], count: 0 },
  } = useQuery({
    queryFn: () => getT2ForMonthForPagination(month, year, page),
    queryKey: ["dogadjaji2", month, year, page],
  });

  return { isLoading, dogadjaji2, year, month, count };
}
