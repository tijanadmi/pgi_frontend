import styled from "styled-components";
import PropTypes from "prop-types";

// import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

// const Room = styled.div`
//   font-size: 1.6rem;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   font-family: "Sono";
// `;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span {
    font-size: 1.4rem;
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
  }
`;

function MonthT2Row({
  pk: {
    id: id,
    stav,
    vrepoc,
    vrezav,
    trajnje,
    id1,
    id2,
    ob_sif,
    naz_ob,
    polje_trafo,
    naziv_vrpd,
    razlog,
  },
}) {
  //   const navigate = useNavigate();
  //   const { checkout, isCheckingOut } = useCheckout();
  //   const { deleteBooking, isDeleting } = useDeleteBooking();

  // console.log("prekidik u IDKRow:", id, vrepoc, ob_sif);

  // let pr;
  // if (id_s_vr_prek === "1") {
  //   pr = "planiran";
  // } else {
  //   pr = "neplaniran";
  // }
  // const processedToTagName = {
  //   neplaniran: "red",
  //   planiran: "blue",
  // };

  return (
    <Table.Row>
      {/* <Room>{ob_opis}</Room> */}
      {/* <Stacked>
        <span>{stav}</span>
      </Stacked> */}
      <Stacked>
        <span>{id}</span>
      </Stacked>
      <Stacked>
        <span>{id1}</span>
      </Stacked>
      <Stacked>
        <span>{id2}</span>
      </Stacked>

      <Stacked>
        {/* <span>{format(new Date(vrepoc), "MMM dd yyyy")}</span>
        <span>{format(new Date(vrezav), "MMM dd yyyy")}</span> */}
        <span>{vrepoc}</span>
        <span>{vrezav}</span>
      </Stacked>
      <Stacked>
        <span>{trajnje}</span>
      </Stacked>
      {/* <Stacked>
        <span>{podvrsta_prek}</span>
      </Stacked> */}

      {/* <Tag type={processedToTagName[pr]}>{pr.replace("-", " ")}</Tag> */}

      <Stacked>
        <span>{ob_sif}</span>
        <span>{naz_ob}</span>
      </Stacked>
      <Stacked>
        <span>{polje_trafo}</span>
      </Stacked>
      <Stacked>
        <span>{naziv_vrpd}</span>
      </Stacked>
      <Stacked>
        <span>{razlog}</span>
      </Stacked>
    </Table.Row>
  );
}

MonthT2Row.propTypes = {
  pk: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    vrepoc: PropTypes.string.isRequired,
    vrezav: PropTypes.string,
    trajnje: PropTypes.string,
    id1: PropTypes.string,
    id2: PropTypes.string,
    stav: PropTypes.string,
    ob_sif: PropTypes.string,
    naz_ob: PropTypes.string,
    polje_trafo: PropTypes.string,
    naziv_vrpd: PropTypes.string,
    razlog: PropTypes.string,
  }).isRequired,
};

export default MonthT2Row;
