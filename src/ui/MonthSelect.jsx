import { useSearchParams } from "react-router-dom";
import Select from "./Select";

const monthNames = [
  "Јануар",
  "Фебруар",
  "Март",
  "Април",
  "Мај",
  "Јун",
  "Јул",
  "Август",
  "Септембар",
  "Октобар",
  "Новембар",
  "Децембар",
];

function MonthSelect() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentMonth = new Date().getMonth() + 1;
  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: monthNames[i],
  }));

  const monthParam =
    searchParams.get("month") ||
    (currentMonth === 1 ? "12" : (currentMonth - 1).toString());

  function handleChange(e) {
    searchParams.set("month", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={months}
      type="white"
      value={monthParam}
      onChange={handleChange}
    />
  );
}

export default MonthSelect;
