import SearchSelect from "../../ui/SearchSelect";
import { useMernaMesta } from "./useMernaMesta";

function MernaMestaSearchSelect({ value, onChange, isDisabled }) {
  const { isLoading, mernaMesta = [] } = useMernaMesta();

  if (isLoading) return <p>Учитавање...</p>;

  const options = mernaMesta.map((m) => ({
    value: m.id,
    label: m.name,
  }));

  


  return (
    <SearchSelect
      options={options}
      value={value ?? ""} // ✅ UVEK option
      onChange={(val) => {
      console.log("MernaMesta changed to:", val);
      onChange(val ?? "");
}}
      isDisabled={isDisabled}
      placeholder="Изабери мерно место..."
    />
  );
}

export default MernaMestaSearchSelect;
