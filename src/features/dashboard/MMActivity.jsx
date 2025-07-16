import styled from "styled-components";

import Heading from "../../ui/Heading";
import Row from "../../ui/Row";

import MMItem from "./MMItem";
import PropTypes from "prop-types";

const StyledToday = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;

const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

function MMActivity({ t1, t2, t3, t4, year, month }) {
  const hasActivity = t1 !== 0 || t2 !== 0 || t3 !== 0 || t4 !== 0;
  // console.log(t1, t2, t3, t4);
  return (
    <StyledToday>
      <Row type="horizontal">
        <Heading as="h2">Месечни извештај по тачкама:</Heading>
      </Row>

      {hasActivity ? (
        <TodayList>
          {t1 !== 0 && (
            <MMItem naziv={"t1"} tacka={t1} year={year} month={month} />
          )}
          {t2 !== 0 && (
            <MMItem naziv={"t2"} tacka={t2} year={year} month={month} />
          )}
          {t3 !== 0 && (
            <MMItem naziv={"t3"} tacka={t3} year={year} month={month} />
          )}
          {t4 !== 0 && (
            <MMItem naziv={"t4"} tacka={t4} year={year} month={month} />
          )}
        </TodayList>
      ) : (
        <NoActivity>Нема догађаја...</NoActivity>
      )}
    </StyledToday>
  );
}

MMActivity.propTypes = {
  t1: PropTypes.number.isRequired,
  t2: PropTypes.number.isRequired,
  t3: PropTypes.number.isRequired,
  t4: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
};

export default MMActivity;
