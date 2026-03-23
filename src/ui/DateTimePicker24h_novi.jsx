import { useMemo } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimeField } from "@mui/x-date-pickers/DateTimeField";
import TextField from "@mui/material/TextField";
import srLocale from "date-fns/locale/sr-Latn";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import InputAdornment from "@mui/material/InputAdornment";

function DateTimePicker24h({ value, onChange, disabled }) {
  const parsedValue = useMemo(() => {
    if (!value) return null;
    try {
      const [datePart, timePart] = value.split(" ");
      const [dd, mm, yyyy] = datePart.split(".");
      return new Date(`${yyyy}-${mm}-${dd}T${timePart}`);
    } catch {
      return null;
    }
  }, [value]);

  const handleChange = (newDate) => {
    if (!newDate || isNaN(newDate.getTime())) {
      onChange("");
      return;
    }
    const dd = String(newDate.getDate()).padStart(2, "0");
    const mm = String(newDate.getMonth() + 1).padStart(2, "0");
    const yyyy = newDate.getFullYear();
    const hh = String(newDate.getHours()).padStart(2, "0");
    const min = String(newDate.getMinutes()).padStart(2, "0");
    onChange(`${dd}.${mm}.${yyyy} ${hh}:${min}`);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={srLocale}>
      <DateTimeField
        value={parsedValue}
        onChange={handleChange}
        ampm={false}
        disabled={disabled}
        format="dd.MM.yyyy HH:mm"
        enableKeyboardInput
        slotProps={{
          textField: {
            fullWidth: true,
            placeholder: "dd.mm.yyyy hh:mm",
            disabled,
            size: "medium",
            sx: {
              fontSize: "1.5rem",
              "& .MuiInputBase-input": {
                padding: "0.8rem 1rem",
                fontSize: "1.5rem",
              },
            },
            InputProps: {
              endAdornment: (
                <InputAdornment position="end">
                  <CalendarTodayIcon style={{ fontSize: "1.6rem", cursor: "pointer" }} />
                </InputAdornment>
              ),
            },
          },
        }}
      />
    </LocalizationProvider>
  );
}

export default DateTimePicker24h;