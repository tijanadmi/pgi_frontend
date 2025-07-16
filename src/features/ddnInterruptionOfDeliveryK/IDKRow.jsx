import styled from "styled-components";
import PropTypes from "prop-types";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

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

function IDKRow({
  pk: {
    // id: id,
    // mrc,
    vrepoc,
    vrezav,
    ob_opis,
    id_s_vr_prek,
    uzrok,
    poduzrok_prek,
    snaga,
    merna_mesta,
    broj_mesta,
  },
}) {
  //   const navigate = useNavigate();
  //   const { checkout, isCheckingOut } = useCheckout();
  //   const { deleteBooking, isDeleting } = useDeleteBooking();

  // console.log("prekidik u IDKRow:", id, vrepoc, ob_opis);

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
    <Table.Row>
      <Room>{ob_opis}</Room>

      <Stacked>
        {/* <span>{format(new Date(vrepoc), "MMM dd yyyy")}</span>
        <span>{format(new Date(vrezav), "MMM dd yyyy")}</span> */}
        <span>{vrepoc}</span>
        <span>{vrezav}</span>
      </Stacked>
      {/* <Stacked>
        <span>{podvrsta_prek}</span>
      </Stacked> */}

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
