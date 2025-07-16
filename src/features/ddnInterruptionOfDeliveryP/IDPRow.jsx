import styled from "styled-components";
import PropTypes from "prop-types";

// import { format } from "date-fns";
// import {
//   HiArrowDownOnSquare,
//   HiArrowUpOnSquare,
//   HiEye,
//   HiTrash,
// } from "react-icons/hi2";
// import { useNavigate } from "react-router-dom";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
// import Modal from "../../ui/Modal";
// import Menus from "../../ui/Menus";
// import ConfirmDelete from "../../ui/ConfirmDelete";

// import { formatCurrency } from "../../utils/helpers";
// import { formatDistanceFromNow } from "../../utils/helpers";
// import { useCheckout } from "../check-in-out/useCheckout";
// import { useDeleteBooking } from "./useDeleteBooking";

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

function IDPRow({
  pp: {
    // id: id,
    // mrc,
    vrepoc,
    vrezav,
    ob_opis,
    polje_opis,
    id_s_vr_prek,
    //vrsta_prek,
    podvrsta_prek,
    uzrok,
    poduzrok_prek,
    snaga,
    // opis,
  },
}) {
  //   const navigate = useNavigate();
  //   const { checkout, isCheckingOut } = useCheckout();
  //   const { deleteBooking, isDeleting } = useDeleteBooking();

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
    <Table.Row>
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

      {/* <Modal>
        <Menus.Menu>
          <Menus.Toggle id={reservation_id} />
          <Menus.List id={reservation_id}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${reservation_id}`)}
            >
              See details
            </Menus.Button>

            {status === "unconfirmed" && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${reservation_id}`)}
              >
                Check in
              </Menus.Button>
            )}

            {status === "checked-in" && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => checkout(reservation_id)}
                disabled={isCheckingOut}
              >
                Check out
              </Menus.Button>
            )}

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete booking</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="booking"
            disabled={isDeleting}
            onConfirm={() => deleteBooking(reservation_id)}
          />
        </Modal.Window>
      </Modal> */}
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
