import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

import { useBookings } from "./useBookings";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
import Empty from "../../ui/Empty";

function BookingTable() {
  
  const { reservations, isLoading, count} = useBookings();

  if (isLoading) return <Spinner />;
  // console.log('Reservations:', reservations);
  // console.log('count:', count);
  if (count === 0) return <Empty resourceName="bookings" />;


  return (
    <Menus>
      <Table columns="2fr 2fr 2.4fr 1.4fr 1fr 1fr 1.2rem">
        <Table.Header>
          <div>Room</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Processed</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={reservations}
          render={(reservation) => (
            <BookingRow key={reservation.reservation_id} reservation={reservation} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
