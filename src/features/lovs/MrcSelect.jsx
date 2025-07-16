import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useMrcs } from "./useMrcs";
import Select from "../../ui/Select";

function MrcSelect() {
  const { isLoading, mrcs } = useMrcs();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedMrc = searchParams.get("mrcId") || "";

  // Postavljanje default vrednosti mrcId = 9 ako nije već postavljena
  useEffect(() => {
    if (!searchParams.get("mrcId")) {
      searchParams.set("mrcId", "9");
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  const options = mrcs
    ? mrcs.map((mrc) => ({ value: mrc.id, label: mrc.name_cir }))
    : [];

  function handleChange(e) {
    searchParams.set("mrcId", e.target.value);
    if (searchParams.get("page")) searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  return isLoading ? (
    <p>Učitavanje...</p>
  ) : (
    <Select options={options} value={selectedMrc} onChange={handleChange} />
  );
}

export default MrcSelect;
