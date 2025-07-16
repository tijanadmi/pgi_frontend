import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

export function useBooking() {
  const { reservationId } = useParams();

  const {
    isLoading,
    data: reservation,
    error,
  } = useQuery({
    queryKey: ["reservation", reservationId],
    queryFn: () => getBooking(reservationId),
    retry: false,
  });

  return { isLoading, error, reservation };
}