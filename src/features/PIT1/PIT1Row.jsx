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

function PIT1Row({
  pk: {
    vrepoc_hhmi,
    vrezav_hhmi,
    poc_pp,
    zav_pp,
    trajnje,
    id,
    ob_sif,
    naz_ob,
    polje_trafo,
    snaga,
    naziv_vrpd,
    gr_uzrok,
    uzrok,
    weather_conditions,
  },
}) {
  //   const navigate = useNavigate();
  //   const { checkout, isCheckingOut } = useCheckout();
  //   const { deleteBooking, isDeleting } = useDeleteBooking();

  // console.log("prekidik u IDKRow:", id, vrepoc_hhmi, ob_sif);

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
      <Stacked>
        <span>{id}</span>
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
        <span>{snaga}</span>
      </Stacked>
      <Stacked>
        <span>{naziv_vrpd}</span>
        <span>{weather_conditions}</span>
      </Stacked>
      <Stacked>
        <span>{gr_uzrok}</span>
        <span>{uzrok}</span>
      </Stacked>
    </Table.Row>
  );
}

PIT1Row.propTypes = {
  pk: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    vrepoc_hhmi: PropTypes.string.isRequired,
    vrezav_hhmi: PropTypes.string,
    poc_pp: PropTypes.string,
    zav_pp: PropTypes.string,
    trajnje: PropTypes.string,
    ob_sif: PropTypes.string,
    naz_ob: PropTypes.string,
    polje_trafo: PropTypes.string,
    snaga: PropTypes.string,
    naziv_vrpd: PropTypes.string,
    gr_uzrok: PropTypes.string,
    uzrok: PropTypes.string,
    weather_conditions: PropTypes.string,
  }).isRequired,
};

export default PIT1Row;
