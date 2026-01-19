import Button from "../../ui/Button";
import CreateIntOfDeliveryKForm from "./CreateIntOfDeliveryKForm";
import Modal from "../../ui/Modal";

function AddIntOfDeliveryK() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="prekidk-form">
          <Button
      type="submit"
      size="large"
      variation="primary"
    >
      Унеси нови прекид корисника
    </Button>
        </Modal.Open>
        <Modal.Window name="prekidk-form">
          <CreateIntOfDeliveryKForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddIntOfDeliveryK;
