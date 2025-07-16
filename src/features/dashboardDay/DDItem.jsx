import styled from "styled-components";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Tag from "../../ui/Tag";
// import { Flag } from "../../ui/Flag";
import Button from "../../ui/Button";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 18rem 5rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

function DDItem({ naziv, tacka, day, mrcId }) {
  return (
    <StyledTodayItem>
      {/* <Guest>{naziv}</Guest> */}
      {naziv === "t1" && <Tag type="red">Испади/кварови</Tag>}
      {naziv === "t2" && <Tag type="blue">Искључења/Укључења</Tag>}
      {naziv === "t3" && <Tag type="green">Дужи кварови</Tag>}
      {naziv === "t4" && <Tag type="blue">Проблематика погона мреже</Tag>}
      <div>{tacka} </div>

      <Button
        size="small"
        variation="primary"
        as={Link}
        to={`/dnevni/${naziv}?day=${day}&mrcId=${mrcId}`}
      >
        Детаљи
      </Button>
    </StyledTodayItem>
  );
}

DDItem.propTypes = {
  naziv: PropTypes.string.isRequired,
  tacka: PropTypes.number.isRequired,
  day: PropTypes.string.isRequired,
  mrcId: PropTypes.number.isRequired,
};
export default DDItem;
