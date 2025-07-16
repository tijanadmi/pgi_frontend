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

function DayT2Row({
  pk: {
    vrepoc_hhmi,
    vrezav_hhmi,
    poc_pp,
    zav_pp,
    trajnje,
    id1,
    id2,
    ob_sif,
    naz_ob,
    polje_trafo,
    naziv_vrpd,
    gr_razlog,
    razlog,
  },
}) {
  //   const navigate = useNavigate();
  //   const { checkout, isCheckingOut } = useCheckout();
  //   const { deleteBooking, isDeleting } = useDeleteBooking();

  // console.log("prekidik u IDKRow:", id, vrepoc_hhmi, ob_sif);

  return (
    <Table.Row>
      <Stacked>
        <span>{id1}</span>
      </Stacked>
      <Stacked>
        <span>{id2}</span>
      </Stacked>

      <Stacked>
        <span>{vrepoc_hhmi}</span>
        <span>{vrezav_hhmi}</span>
      </Stacked>
      <Stacked>
        <span>{poc_pp}</span>
        <span>{zav_pp}</span>
      </Stacked>
      <Stacked>
        <span>{trajnje}</span>
      </Stacked>

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
        <span>{gr_razlog}</span>
        <span>{razlog}</span>
      </Stacked>
    </Table.Row>
  );
}

DayT2Row.propTypes = {
  pk: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    vrepoc_hhmi: PropTypes.string.isRequired,
    vrezav_hhmi: PropTypes.string,
    poc_pp: PropTypes.string,
    zav_pp: PropTypes.string,
    trajnje: PropTypes.string,
    id1: PropTypes.string,
    id2: PropTypes.string,
    ob_sif: PropTypes.string,
    naz_ob: PropTypes.string,
    polje_trafo: PropTypes.string,
    naziv_vrpd: PropTypes.string,
    gr_razlog: PropTypes.string,
    razlog: PropTypes.string,
  }).isRequired,
};

export default DayT2Row;
