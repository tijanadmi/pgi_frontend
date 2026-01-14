import SearchSelect from "../../ui/SearchSelect";
import { useUzrokPrek } from "./useUzrokPrek";

function UzrokPrekSearchSelect({ value, onChange, isDisabled }) {
  const { isLoading, uzrokprek = [] } = useUzrokPrek();

  if (isLoading) return <p>Učitavanje...</p>;

  const options = uzrokprek.map((u) => ({
    value: u.id,
    label: u.name,
  }));

  return (
    <SearchSelect
      options={options}
      value={value}
      onChange={onChange}
      isDisabled={isDisabled}
      placeholder="Izaberi uzrok prekida..."
    />
  );
}

export default UzrokPrekSearchSelect;
