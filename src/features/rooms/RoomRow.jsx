
import styled from "styled-components";
import CreateRoomForm from "./CreateRoomForm";

 import { useDeleteRoom } from "./useDeleteRoom";
 import { formatCurrency } from "../../utils/helpers";
 import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
 import { useCreateRoom } from "./useCreateRoom";

import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

// const TableRow = styled.div`
//   display: grid;
//   /* grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr; */
//   grid-template-columns:  2.2fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Room = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;



function RoomRow({ room }) {
  const { isDeleting, deleteRoom } = useDeleteRoom();
 const { isCreating, createRoom } = useCreateRoom();

  const {
    room_id,
    room_name_sr,
    room_name_en,
    room_name_bg,
    room_shortdes_sr,
    room_shortdes_en,
    room_shortdes_bg,
    room_des_sr,
    room_des_en,
    room_des_bg,
    room_pictures_folder,
    room_guest_number,
    room_price_en,

  } = room;
  
  function handleDuplicate() {
    createRoom({
      room_name_sr: `Copy of ${room_name_sr}`,
      room_name_en,
      room_name_bg,
      room_shortdes_sr,
      room_shortdes_en,
      room_shortdes_bg,
      room_des_sr,
      room_des_en,
      room_des_bg,
      room_pictures_folder,
      room_guest_number,
      room_price_en,
    });
  }

  return (
    <>
      <Table.Row>
        {/* <Img src={image} /> */}
        <Room>{room_name_sr}</Room>
        <div>{room_shortdes_sr}</div>
        <div>Fits up to {room_guest_number} guests</div>
        <Price>{formatCurrency(room_price_en)}</Price>
        <div>

        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={room_id} />

            <Menus.List id={room_id}>
              <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
                Duplicate
              </Menus.Button>


              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>

            </Menus.List>

              <Modal.Window name="edit">
                <CreateRoomForm roomToEdit={room} />
              </Modal.Window>

              <Modal.Window name="delete">
                <ConfirmDelete
                  resourceName="room"
                  disabled={isDeleting}
                  onConfirm={() => deleteRoom(room_id)}
                />
              </Modal.Window>

          </Menus.Menu>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}

export default RoomRow;