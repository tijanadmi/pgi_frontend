import Button from "../../ui/Button";
import CreateIntOfDeliveryPForm from "./CreateIntOfDeliveryPForm";
import Modal from "../../ui/Modal";

function AddIntOfDeliveryP() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="prekidp-form">
          <Button
      type="submit"
      size="large"
      variation="primary"
    >
      Унеси нови прекид производње
    </Button>
        </Modal.Open>
        <Modal.Window name="prekidp-form">
          <CreateIntOfDeliveryPForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddIntOfDeliveryP;
