import { useSearchParams } from "react-router-dom";
import { useUzrokPrek } from "./useUzrokPrek";
import Select from "../../ui/Select";

function UzrokPrekSelect() {
  const { isLoading, uzrokprek } = useUzrokPrek();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedUzrokPrek = searchParams.get("uzrokPrekId") || "";

  const options = uzrokprek
    ? uzrokprek.map((up) => ({
        value: up.id,
        label: up.name,
      }))
    : [];

  function handleChange(e) {
    searchParams.set("uzrokPrekId", e.target.value);

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
      value={selectedUzrokPrek}
      onChange={handleChange}
    />
  );
}

export default UzrokPrekSelect;
