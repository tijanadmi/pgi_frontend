import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledDateInput = styled.input`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.$variant === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

function DaySelect({ variant = "white" }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const dayParam = searchParams.get("day");

  const defaultDate = (() => {
    if (dayParam) {
      const [dd, mm, yyyy] = dayParam.split(".");
      return `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
    } else {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return yesterday.toISOString().split("T")[0]; // yyyy-mm-dd
    }
  })();

  function handleChange(e) {
    const date = new Date(e.target.value);
    const formattedDate = `${String(date.getDate()).padStart(2, "0")}.${String(
      date.getMonth() + 1
    ).padStart(2, "0")}.${date.getFullYear()}`;

    searchParams.set("day", formattedDate);
    if (searchParams.get("page")) searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  return (
    <StyledDateInput
      type="date"
      value={defaultDate}
      onChange={handleChange}
      $variant={variant}
    />
  );
}

DaySelect.propTypes = {
  variant: PropTypes.string, // ili PropTypes.oneOf(["white", "gray"]) ako želiš striktno
};

export default DaySelect;
