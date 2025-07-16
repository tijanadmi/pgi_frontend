import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";

import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

import { getRooms } from "../../services/apiRooms";
import RoomRow from "./RoomRow";

import { useRooms } from "./useRooms";

// const TableHeader = styled.header`
//   display: grid;
//   /* grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr; */
//   grid-template-columns:   2.2fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

function RoomTable() {
  const { isLoading, rooms } = useRooms();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!rooms.length) return <Empty resourceName="rooms" />;

  // 1) FILTER
  const filterValue = searchParams.get("funkc") || "all";

  let filteredDogadjaji;
  if (filterValue === "all") filteredDogadjaji = rooms;
  if (filterValue === "les-2")
    filteredDogadjaji = rooms.filter((room) => room.room_guest_number <= 2);
  if (filterValue === "gr-2")
    filteredDogadjaji = rooms.filter((room) => room.room_guest_number > 2);

  // 2) SORT
  const sortBy = searchParams.get("sortBy") || "room_id-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  // console.log("field", field);
  // console.log("direction", direction);
  const sortedDogadjaji = filteredDogadjaji.sort((a, b) => {
    if (typeof a[field] === "string" && typeof b[field] === "string") {
      // Sortiranje stringova (localeCompare za pravilno sortiranje)
      return a[field].localeCompare(b[field]) * modifier;
    } else {
      // Sortiranje brojeva
      return (a[field] - b[field]) * modifier;
    }
    // (a[field] - b[field]) * modifier
  });

  return (
    <Menus>
      <Table columns="2.2fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div>Room</div>
          <div>Description</div>
          <div>Capacity</div>
          <div>Price</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedDogadjaji}
          render={(room) => <RoomRow room={room} key={room.room_id} />}
        />
      </Table>
    </Menus>
  );
}

export default RoomTable;
