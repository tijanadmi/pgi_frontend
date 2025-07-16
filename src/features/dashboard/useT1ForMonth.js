import { useQuery } from "@tanstack/react-query";
// import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getT1ForMonth } from "../../services/apiMM";

export function useT1ForMonth() {
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
  // const queryDate = subDays(new Date(), numDays).toISOString();

  const {
    isLoading,
    data: { data: dogadjaji, count } = { data: [], count: 0 },
  } = useQuery({
    queryFn: () => getT1ForMonth(month, year),
    queryKey: ["dogadjaji", month, year],
  });

  //   console.log("reservations", reservations);
  // console.log("stays", stays);

  // const confirmedStays = stays?.filter(
  //   (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  // );
  // console.log("confirmedStays", confirmedStays);

  return { isLoading, dogadjaji, year, month, count };
}
