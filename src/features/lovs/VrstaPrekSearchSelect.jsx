import { useVrstaPrek } from "./useVrstaPrek";
import SearchSelect from "../../ui/SearchSelect";

function VrstaPrekSearchSelect({ value, onChange, isDisabled }) {
    // console.log("🔥 VrstaPrekSearchSelect render, value =", value);
  const { isLoading, vrstaprek } = useVrstaPrek();

  if (isLoading) return <p>Učitavanje...</p>;

  const options =
    vrstaprek?.map((vp) => ({
      value: String(vp.id), // 👈 BITNO: string (kao native select)
      label: vp.name,
    })) ?? [];

  return (
    <SearchSelect
      options={options}
      value={value ?? ""}   // 👈 uvek kontrolisana vrednost
      onChange={(val) => {
        console.log("iPoruka iz komponente VrstaPrekSearchSelect: VrstaPrek changed to:", val);
        onChange(val);     // 👈 RHF dobija samo ID
      }}
      isDisabled={isDisabled}
      placeholder="Izaberi vrstu prekida..."
    />
  );
}

export default VrstaPrekSearchSelect;
