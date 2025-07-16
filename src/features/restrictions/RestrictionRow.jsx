import styled from "styled-components";
import CreateRestrictionForm from "./CreateRestrictionForm";

import { useDeleteRestriction } from "./useDeleteRestriction";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateRestriction } from "./useCreateRestriction";

import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";



const Restriction = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;


function RestrictionRow({ restriction }) {
  const { isDeleting, deleteRestriction } = useDeleteRestriction();
  const { isCreating, createRestriction } = useCreateRestriction();

  const {
    restriction_id,
    restriction_name_sr,
    restriction_name_en,
    restriction_name_bg,
  } = restriction;

  function handleDuplicate() {
    createRestriction({
      restriction_name_sr: `Copy of ${restriction_name_sr}`,
      restriction_name_en,
      restriction_name_bg,
    });
  }

  return (
    <>
      <Table.Row>
        <Restriction>{restriction_name_sr}</Restriction>
        <div>{restriction_name_en}</div>
        <div>{restriction_name_bg}</div>
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={restriction_id} />
              <Menus.List id={restriction_id}>
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
                <CreateRestrictionForm restrictionToEdit={restriction} />
              </Modal.Window>
              <Modal.Window name="delete">
                <ConfirmDelete
                  resourceName="restriction"
                  disabled={isDeleting}
                  onConfirm={() => deleteRestriction(restriction_id)}
                />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}

export default RestrictionRow;
