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

function PIT4Row({ pk: { id1, mrc } }) {
  //   const navigate = useNavigate();
  //   const { checkout, isCheckingOut } = useCheckout();
  //   const { deleteBooking, isDeleting } = useDeleteBooking();

  // console.log("prekidik u IDKRow:", id, id1, mrc);

  return (
    <Table.Row>
      <Stacked>
        <span>{id1}</span>
      </Stacked>
      <Stacked>
        <span>{mrc}</span>
      </Stacked>
    </Table.Row>
  );
}

PIT4Row.propTypes = {
  pk: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    id1: PropTypes.string,
    mrc: PropTypes.string,
  }).isRequired,
};

export default PIT4Row;
