import Button from "../../ui/Button";
import CreateRoomForm from "./CreateRoomForm";
import Modal from "../../ui/Modal";

function AddRoom() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="room-form">
          <Button>Add new room</Button>
        </Modal.Open>
        <Modal.Window name="room-form">
          <CreateRoomForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}


export default AddRoom;