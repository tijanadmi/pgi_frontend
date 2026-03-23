import { useRef } from "react";
import Input from "./Input";
import styled from "styled-components";
import { dotDateTimeToInput, inputToDotDateTime } from "../utils/helpers.js";

const HiddenPicker = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

// function dotDateTimeToInput(val) {
//   if (!val) return "";
//   const [date, time] = val.split(" ");
//   if (!date || !time) return "";
//   const [dd, mm, yyyy] = date.split(".");
//   return `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}T${time}`;
// }

// function inputToDotDateTime(val) {
//   if (!val) return "";
//   const [date, time] = val.split("T");
//   if (!date || !time) return "";
//   const [yyyy, mm, dd] = date.split("-");
//   return `${dd}.${mm}.${yyyy} ${time}`;
// }

function DateTimePicker24h({ value, onChange, disabled }) {
  const pickerRef = useRef(null);

  return (
    <>
      {/* VIDLJIV INPUT */}
      <Input
        type="text"
        value={value || ""}
        placeholder="dd.mm.yyyy hh:mm"
        readOnly
        disabled={disabled}
        onClick={() => pickerRef.current?.showPicker()}
      />

      {/* SAKRIVENI PICKER */}
      <HiddenPicker
        ref={pickerRef}
        type="datetime-local"
        value={dotDateTimeToInput(value)}
        onChange={(e) => onChange(inputToDotDateTime(e.target.value))}
      />
    </>
  );
}

export default DateTimePicker24h;
