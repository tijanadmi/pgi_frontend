import { useObjHETEVE } from "./useObjHETEVE";
import SearchSelect from "../../ui/SearchSelect";

function ObjHETEVESearchSelect({ mrcId, value, onChange, isDisabled }) {
    // console.log("🔥 ObjHETEVESearchSelect render, mrcId =", mrcId, "value =", value);

  const { isLoading, objHETEVE } = useObjHETEVE(mrcId);

   if (!mrcId) {
    return (
      <SearchSelect
        options={[]}
        value=""
        onChange={() => {}}
        isDisabled
        placeholder="Prvo izaberite MRC"
      />
    );
  }


  if (isLoading) return <p>Učitavanje...</p>;

  const options =
    objHETEVE?.map((obj) => ({
      value: String(obj.ob_id), // 👈 BITNO: string (kao native select)
      label: obj.opis,
      id_tipob: obj.tipob,   // 👈 DODATNO POLJE
    })) ?? [];

   
return (
    <SearchSelect
      options={options}
      value={value ?? ""}
      onChange={(opt) => {
        // console.log("Obj changed:", opt);
        onChange(opt); // 👈 prosleđuje ceo option
      }}
      isDisabled={isDisabled}
      placeholder="Izaberi objekat (HE, TE, VE)..."
      returnOption   // 👈 KLJUČNO
    />
  );
}


export default ObjHETEVESearchSelect;
