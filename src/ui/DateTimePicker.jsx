import styled from "styled-components";
import { dotDateTimeToInput, inputToDotDateTime } from "../utils/helpers.js";

const StyledDateTimeInput = styled.input`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
  width: 100%;
`;

function DateTimePicker({ value, onChange, disabled }) {
  return (
    <StyledDateTimeInput
      type="datetime-local"
      value={dotDateTimeToInput(value)}
      onChange={(e) => onChange(inputToDotDateTime(e.target.value))}
      disabled={disabled}
    />
  );
}

export default DateTimePicker;
