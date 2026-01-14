import { useSearchParams } from "react-router-dom";
import { useVrstaPrek } from "./useVrstaPrek";
import Select from "../../ui/Select";

function VrstaPrekSelect() {
  const { isLoading, vrstaprek } = useVrstaPrek();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedVrstaPrek = searchParams.get("vrstaPrekId") || "";

  const options = vrstaprek
    ? vrstaprek.map((tp) => ({
        value: tp.id,
        label: tp.name,
      }))
    : [];

  function handleChange(e) {
    searchParams.set("vrstaPrekId", e.target.value);

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
      value={selectedVrstaPrek}
      onChange={handleChange}
    />
  );
}

export default VrstaPrekSelect;

