import SearchSelect from "../../ui/SearchSelect";
import { useUzrokPrek } from "./useUzrokPrek";

function UzrokPrekSearchSelect({ value, onChange, isDisabled }) {
  const { isLoading, uzrokprek = [] } = useUzrokPrek();

  if (isLoading) return <p>Учитавање...</p>;

  const options = uzrokprek.map((u) => ({
    value: u.id,
    label: u.name,
  }));

  


  return (
    <SearchSelect
      options={options}
      value={value ?? ""} // ✅ UVEK option
      onChange={(val) => {
      console.log("UzrokPrek changed to:", val);
      onChange(val ?? "");
}}
      isDisabled={isDisabled}
      placeholder="Изабери узрок прекида..."
    />
  );
}

export default UzrokPrekSearchSelect;
