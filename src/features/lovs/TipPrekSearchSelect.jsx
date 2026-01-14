import { useSearchParams } from "react-router-dom";
import { useTipPrek } from "./useTipPrek";
import SearchSelect from "../../ui/SearchSelect";

function TipPrekSearchSelect() {
  const { isLoading, tipprek = [] } = useTipPrek();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedTipPrek = searchParams.get("tipPrekId") || "";

  const options = tipprek.map((tp) => ({
    value: tp.id,
    label: tp.name,
  }));

  function handleChange(value) {
    const params = new URLSearchParams(searchParams);

    if (!value) {
      params.delete("tipPrekId");
    } else {
      params.set("tipPrekId", value);
    }

    if (params.get("page")) {
      params.set("page", 1);
    }

    setSearchParams(params);
  }

  if (isLoading) return <p>Učitavanje...</p>;

  return (
    <SearchSelect
      options={options}
      value={selectedTipPrek}
      onChange={handleChange}
      placeholder="Izaberi vrstu prekida..."
    />
  );
}

export default TipPrekSearchSelect;
