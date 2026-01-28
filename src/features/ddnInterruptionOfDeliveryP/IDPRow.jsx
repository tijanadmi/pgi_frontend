import styled from "styled-components";
import PropTypes from "prop-types";

// import { format } from "date-fns";
import { HiPencil, HiSquare2Stack, HiTrash , HiArrowDownOnSquare, HiArrowUpOnSquare} from "react-icons/hi2";


import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import ConfirmDelete from "../../ui/ConfirmDelete";
import ConfirmUpdateBI from "../../ui/ConfirmUpdateBI";
import CreateIntOfDeliveryPForm from "./CreateIntOfDeliveryPForm";


import { useDeleteDDNInterruptionOfDeliveryP } from "./useDeleteDDNInterruptionOfDeliveryP";
import { useEditDDNInterruptionOfDeliveryBI } from "./useEditDDNInterruptionOfDeliveryBI";

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

// const Amount = styled.div`
//   font-family: "Sono";
//   font-weight: 500;
// `;

function IDPRow({pp}) {

  const {
    id: id,
    vrepoc,
    vrezav,
    ob_opis,
    polje_opis,
    id_s_vr_prek,
    podvrsta_prek,
    uzrok,
    poduzrok_prek,
    snaga,
    version,
    bi,
  } = pp;
  //   const navigate = useNavigate();
  //   const { checkout, isCheckingOut } = useCheckout();
    const { deleteInterruption, isDeleting } = useDeleteDDNInterruptionOfDeliveryP();
    const { editInterruptionOfProductionBI, isEditing } = useEditDDNInterruptionOfDeliveryBI();

  // console.log("prekidip:", pp);

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
  //   const statusToTagName = {
  //     unconfirmed: "blue",
  //     "checked-in": "green",
  //     "checked-out": "silver",
  //   };

  return (
    < Table.Row bi={bi}>
      <Room>{ob_opis}</Room>

      <Stacked>
        <span>{polje_opis}</span>
        {/* <span>{email}</span>
        <span>{phone}</span> */}
      </Stacked>

      <Stacked>
        {/* <span>{format(new Date(vrepoc), "MMM dd yyyy")}</span>
        <span>{format(new Date(vrezav), "MMM dd yyyy")}</span> */}
        <span>{vrepoc}</span>
        <span>{vrezav}</span>
      </Stacked>
      <Stacked>
        <span>{podvrsta_prek}</span>
      </Stacked>

      <Tag type={processedToTagName[pr]}>{pr.replace("-", " ")}</Tag>

      <Stacked>
        <span>{uzrok}</span>
        <span>{poduzrok_prek}</span>
      </Stacked>
      <Stacked>
        <span>{snaga}</span>
      </Stacked>

      {/* <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag> */}

      {/* <Amount>{formatCurrency(total_price)}</Amount> */}

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
                resourceName="одаберете/не одаберете прекид производње за БИ"
                disabled={isEditing}
                onConfirm={() =>
                  editInterruptionOfProductionBI({
                    bi: bi === "" ? 0 : 1,
                    id,
                    version,
                  })}
              />
            </Modal.Window>

            <Modal.Window name="edit">
              <CreateIntOfDeliveryPForm interruptionOfDeliveryPToEdit={pp} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="прекид производње"
                disabled={isDeleting}
                onConfirm={() => deleteInterruption({ id, version })}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
    </Table.Row>
  );
}

IDPRow.propTypes = {
  pp: PropTypes.shape({
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
    // opis: PropTypes.string,
  }).isRequired,
};

export default IDPRow;
