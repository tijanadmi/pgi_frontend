import { useSearchParams } from "react-router-dom";
import { usePodUzrokPrek } from "./usePodUzrokPrek";
import Select from "../../ui/Select";

function PodUzrokPrekSelect() {
  const { isLoading, poduzrokprek } = usePodUzrokPrek();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedPodUzrokPrek = searchParams.get("podUzrokPrekId") || "";

  const options = poduzrokprek
    ? poduzrokprek.map((pp) => ({
        value: pp.id,
        label: pp.name,
      }))
    : [];

  function handleChange(e) {
    searchParams.set("podUzrokPrekId", e.target.value);

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
      value={selectedPodUzrokPrek}
      onChange={handleChange}
    />
  );
}

export default PodUzrokPrekSelect;
