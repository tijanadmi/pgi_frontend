import { useObjTSRP } from "./useObjTSRP";
import SearchSelect from "../../ui/SearchSelect";

function ObjTSRPSearchSelect({ mrcId, value, onChange, isDisabled }) {
    // console.log("🔥 ObjTSRPSearchSelect render, mrcId =", mrcId, "value =", value);

  const { isLoading, objTSRP } = useObjTSRP(mrcId);

   if (!mrcId) {
    return (
      <SearchSelect
        options={[]}
        value=""
        onChange={() => {}}
        isDisabled
        placeholder="Прво изаберите РДЦ"
      />
    );
  }


  if (isLoading) return <p>Учитавање...</p>;

  const options =
    objTSRP?.map((obj) => ({
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
      placeholder="Изабери објекат ..."
      returnOption   // 👈 KLJUČNO
    />
  );
}


export default ObjTSRPSearchSelect;
