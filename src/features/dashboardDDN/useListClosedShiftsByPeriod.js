import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getListClosedShiftsByPeriod } from "../../services/apiShifts";

export function useListClosedShiftsByPeriod() {
  const [searchParams] = useSearchParams();

  // DATE PARAMS
  const firstDay = searchParams.get("first_day");
  const lastDay = searchParams.get("last_day");

  // PAGINATION
  const page = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  // MRC
  const mrcId = !searchParams.get("mrcId")
    ? 1
    : Number(searchParams.get("mrcId"));

    // console.log("Params in useListClosedShiftsByPeriod:", {
    //   firstDay,
    //   lastDay,
    //   page,
    //   mrcId
    // });


  // QUERY
  const {
    isLoading,
    data: { data: closedShifts, count } = { data: [], count: 0 },
    error,
  } = useQuery({
    queryKey: ["closedShifts", firstDay, lastDay, mrcId, page],
    queryFn: () =>
      getListClosedShiftsByPeriod(firstDay, lastDay, mrcId, page),
    enabled: Boolean(firstDay && lastDay),
  });

  return { isLoading, error, closedShifts, count };
}