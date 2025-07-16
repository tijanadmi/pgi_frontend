import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getT4ForMonthForPagination } from "../../services/apiMM";

export function useListMonthT4() {
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

  // QUERY
  const {
    isLoading,
    data: { data: dogadjaji, count } = { data: [], count: 0 }, // Podrazumevane vrednosti
    error,
  } = useQuery({
    queryKey: ["dogadjaji", month, year, page],
    queryFn: () => getT4ForMonthForPagination(month, year, page),
  });

  // console.log("reservations", reservations)
  return { isLoading, error, dogadjaji, count };
}
