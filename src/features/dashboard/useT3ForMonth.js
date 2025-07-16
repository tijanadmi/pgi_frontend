import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getT3ForMonthForPagination } from "../../services/apiMM";

export function useT3ForMonth() {
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
    data: { data: dogadjaji3, count } = { data: [], count: 0 },
  } = useQuery({
    queryFn: () => getT3ForMonthForPagination(month, year, page),
    queryKey: ["dogadjaji3", month, year, page],
  });

  return { isLoading, dogadjaji3, year, month, count };
}
