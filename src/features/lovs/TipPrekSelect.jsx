import { useSearchParams } from "react-router-dom";
import { useTipPrek } from "./useTipPrek";
import Select from "../../ui/Select";

function TipPrekSelect() {
  const { isLoading, tipprek } = useTipPrek();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedTipPrek = searchParams.get("tipPrekId") || "";

  const options = tipprek
    ? tipprek.map((tp) => ({
        value: tp.id,
        label: tp.name,
      }))
    : [];

  function handleChange(e) {
    searchParams.set("tipPrekId", e.target.value);

    // reset pagination ako postoji
    if (searchParams.get("page")) {
      searchParams.set("page", 1);
    }

    setSearchParams(searchParams);
  }

  if (isLoading) return <p>Učitavanje...</p>;

  return (
    <Select
      options={options}
      value={selectedTipPrek}
      onChange={handleChange}
    />
  );
}

export default TipPrekSelect;

