import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";

import Spinner from "../../ui/Spinner";

import { getRooms } from "../../services/apiRooms";
import RoomRow from "./RoomRow";

import { useRooms } from "./useRooms";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  /* grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr; */
  grid-template-columns:   2.2fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function RoomTable() {
  const { isLoading, rooms } = useRooms();
 

  if (isLoading) return <Spinner />;

  return (
    <Table role="table">
      <TableHeader role="row">
        <div>Room</div>
        <div>Description</div>
        <div>Capacity</div>
        <div>Price</div>
        <div></div>
      </TableHeader>
      {rooms.map((room) => (
        <RoomRow room={room} key={room.room_id} />
      ))}
    </Table>
  );
}

export default RoomTable;
