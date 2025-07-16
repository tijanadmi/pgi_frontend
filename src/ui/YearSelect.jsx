import { useSearchParams } from "react-router-dom";
import Select from "./Select";

const yearsBack = 15;

function YearSelect() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: yearsBack + 1 },
    (_, i) => currentYear - i
  );

  const yearParam = searchParams.get("year") || "";

  function handleChange(e) {
    searchParams.set("year", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={years.map((year) => ({ value: year, label: year.toString() }))}
      type="white"
      value={yearParam}
      onChange={handleChange}
    />
  );
}

export default YearSelect;
