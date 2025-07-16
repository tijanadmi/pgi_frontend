import Button from "../../ui/Button";
import CreateRestrictionForm from "./CreateRestrictionForm";
import Modal from "../../ui/Modal";

function AddRestriction() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="restriction-form">
          <Button>Add new restriction</Button>
        </Modal.Open>
        <Modal.Window name="restriction-form">
          <CreateRestrictionForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}


export default AddRestriction;