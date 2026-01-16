import { useMrcsForInsert } from "./useMrcsForInsert";
import SearchSelect from "../../ui/SearchSelect";
import { usePoljaGE } from "./usePoljaGE";

function PoljaGESearchSelect({ obId,value, onChange, isDisabled }) {
    // console.log("🔥 PoljaGESearchSelect render, value =", value);
  const { isLoading, poljaGE } = usePoljaGE(obId);

  if (!obId) {
    return (
      <SearchSelect
        options={[]}
        value=""
        onChange={() => {}}
        isDisabled
        placeholder="Прво изаберите објекат"
      />
    );
  }

  if (isLoading) return <p>Учитавање...</p>;

  const options =
    poljaGE?.map((polje) => ({
      value: String(polje.polje_id), // 👈 BITNO: string (kao native select)
      label: polje.polje_naziv,
    })) ?? [];

  return (
    <SearchSelect
      options={options}
      value={value ?? ""}   // 👈 uvek kontrolisana vrednost
      onChange={(val) => {
        // console.log("iPoruka iz komponente PoljaGESearchSelect: PoljaGE changed to:", val);
        onChange(val);     // 👈 RHF dobija samo ID
      }}
      isDisabled={isDisabled}
      placeholder="Изабери поље..."
    />
  );
}

export default PoljaGESearchSelect;
