import styled from "styled-components";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Tag from "../../ui/Tag";
// import { Flag } from "../../ui/Flag";
import Button from "../../ui/Button";

import { openPiMmPdfReport } from "../../services/apiReports";
import { getMonthStartEnd } from "../../utils/helpers";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 18rem 5rem 9rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

function MMItem({ naziv, tacka, year, month }) {
  const TIPD_MAP = {
    t1: "1",
    t2: "2",
    t3: "3",
    t4: "4",
  };

  const handlePdf = () => {
    const { firstDay, lastDay } = getMonthStartEnd(month, year);

    openPiMmPdfReport({
      startDate: firstDay,
      endDate: lastDay,
      tipd: TIPD_MAP[naziv] ?? "%", // ili kako već mapiraš
      komisija: "0",
    });
  };


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
        to={`/mesecni/${naziv}?month=${month}&year=${year}`}
      >
        Детаљи
      </Button>
      <Button
        size="small"
        variation="pdf"
        onClick={handlePdf}
      >
        📄 PDF
      </Button>
    </StyledTodayItem>
  );
}

MMItem.propTypes = {
  naziv: PropTypes.string.isRequired,
  tacka: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
};
export default MMItem;
