import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getReservationsWithParams } from "../../services/apiBookings";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // console.log("usao u useBookings")
  // FILTER
  const filterValue = searchParams.get("processed");

  const filter = !filterValue || filterValue === "all"
  ? "all"
  : filterValue === "processed"
  ? "1" 
  : filterValue === "not-processed"
  ? "0" 
  : null; 

  const filterValue1 = searchParams.get("status");
  const filter1 =
    !filterValue1 || filterValue1 === "all"
      ? null
      : { field: "status", value: filterValue1 };

 
  // SORT
  const sortByRaw = searchParams.get("sortBy") || "start_date-DESC";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };
  // console.log("sortBy=", sortBy)

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // QUERY
  const {
    isLoading,
    data: { data: reservations, count } = { data: [], count: 0 }, // Podrazumevane vrednosti
    error,
  } = useQuery({
    queryKey: ["reservations", filter, filter1, sortBy, page],
    queryFn: () => getReservationsWithParams(filter, filter1, sortBy, page),
  });

  // console.log("reservations", reservations)
  return { isLoading, error, reservations, count  };
  }