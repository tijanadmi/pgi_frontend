import styled from "styled-components";
import PropTypes from "prop-types";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { HiPencil, HiSquare2Stack, HiTrash , HiArrowDownOnSquare, HiArrowUpOnSquare} from "react-icons/hi2";


import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import ConfirmDelete from "../../ui/ConfirmDelete";
import ConfirmUpdateBI from "../../ui/ConfirmUpdateBI";
import CreateIntOfDeliveryKForm from "./CreateIntOfDeliveryKForm";


import { useDeleteDDNInterruptionOfDeliveryK } from "./useDeleteDDNInterruptionOfDeliveryK";
import { useEditDDNInterruptionOfDeliveryKBI } from "./useEditDDNInterruptionOfDeliveryKBI";

const Room = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

function IDKRow({pk}) {

  // console.log("prekidik u IDKRow:", id, vrepoc, ob_opis);

  const {
    id: id,
    // mrc,
    vrepoc,
    vrezav,
    trajanje,
    ob_opis,
    id_s_vr_prek,
    uzrok,
    poduzrok_prek,
    snaga,
    merna_mesta,
    broj_mesta,
    version,
    bi,
  } = pk;

  const { deleteInterruptionK, isDeleting } = useDeleteDDNInterruptionOfDeliveryK();
  const { editInterruptionOfDeliveryKBI, isEditing } = useEditDDNInterruptionOfDeliveryKBI();


  let pr;
  if (id_s_vr_prek === "1") {
    pr = "planiran";
  } else {
    pr = "neplaniran";
  }
  const processedToTagName = {
    neplaniran: "red",
    planiran: "blue",
  };

  return (
    <Table.Row bi={bi}>
      <Room>{ob_opis}</Room>

      <Stacked>
        {/* <span>{format(new Date(vrepoc), "MMM dd yyyy")}</span>
        <span>{format(new Date(vrezav), "MMM dd yyyy")}</span> */}
        <span>{vrepoc}</span>
        <span>{vrezav}</span>
      </Stacked>
      <Stacked>
        <span>{trajanje}</span>
      </Stacked>

      <Tag type={processedToTagName[pr]}>{pr.replace("-", " ")}</Tag>

      <Stacked>
        <span>{uzrok}</span>
        <span>{poduzrok_prek}</span>
      </Stacked>
      <Stacked>
        <span>{snaga}</span>
      </Stacked>
      <Stacked>
        <span>{merna_mesta}</span>
        <span>{broj_mesta}</span>
      </Stacked>

      <Modal>
                <Menus.Menu>
                  <Menus.Toggle id={id} />
      
                  <Menus.List id={id}>
                    {/* <Menus.Button
                      icon={<HiSquare2Stack />}
                      // onClick={handleDuplicate}
                      // disabled={isCreating}
                    >
                      Duplicate
                    </Menus.Button> */}

                    {bi === "" && (
                      <Modal.Open opens="updateBI">
                        <Menus.Button icon={<HiArrowDownOnSquare />}>
                          Одабери за БИ
                        </Menus.Button>
                      </Modal.Open>
                    )}

                    {bi === "1" && (
                      <Modal.Open opens="updateBI">
                        <Menus.Button icon={<HiArrowUpOnSquare />}>
                          Избаци из БИ
                        </Menus.Button>
                      </Modal.Open>
                  )}  
      
                    <Modal.Open opens="edit">
                      <Menus.Button icon={<HiPencil />}>Измени</Menus.Button>
                    </Modal.Open>
      
                    <Modal.Open opens="delete">
                      <Menus.Button icon={<HiTrash />}>Обриши</Menus.Button>
                    </Modal.Open>
                  </Menus.List>

                  <Modal.Window name="updateBI">
                    <ConfirmUpdateBI
                      resourceName="одаберете/не одаберете прекид корисника за БИ"
                      disabled={isEditing}
                      onConfirm={() =>
                        editInterruptionOfDeliveryKBI({
                          bi: bi === "" ? 0 : 1,
                          id,
                          version,
                        })}
                    />
                  </Modal.Window>
      
                  <Modal.Window name="edit">
                    <CreateIntOfDeliveryKForm interruptionOfDeliveryKToEdit={pk} />
                  </Modal.Window>
      
                  <Modal.Window name="delete">
                    <ConfirmDelete
                      resourceName="прекид корисника"
                      disabled={isDeleting}
                      onConfirm={() => deleteInterruptionK({ id, version })}
                    />
                  </Modal.Window>
                </Menus.Menu>
              </Modal>
    </Table.Row>
  );
}

IDKRow.propTypes = {
  pk: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    // mrc: PropTypes.string.isRequired,
    vrepoc: PropTypes.string.isRequired,
    vrezav: PropTypes.string,
    ob_opis: PropTypes.string,
    polje_opis: PropTypes.string,
    id_s_vr_prek: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    // vrsta_prek: PropTypes.string.isRequired,
    podvrsta_prek: PropTypes.string,
    uzrok: PropTypes.string,
    poduzrok_prek: PropTypes.string,
    snaga: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    merna_mesta: PropTypes.string,
    broj_mesta: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    // opis: PropTypes.string,
  }).isRequired,
};

export default IDKRow;
