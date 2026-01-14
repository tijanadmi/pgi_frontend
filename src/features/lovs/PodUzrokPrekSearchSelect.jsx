import { usePodUzrokPrek } from "./usePodUzrokPrek";
import SearchSelect from "../../ui/SearchSelect";

function PodUzrokPrekSearchSelect({ value, onChange, isDisabled }) {
  const { isLoading, poduzrokprek } = usePodUzrokPrek();

  if (isLoading) return <p>Učitavanje...</p>;

  const options =
    poduzrokprek?.map((p) => ({
      value: p.id,
      label: p.name,
    })) ?? [];

  return (
    <SearchSelect
      options={options}
      value={value}
      onChange={onChange}
      isDisabled={isDisabled}
      placeholder={
        isDisabled
          ? "Uzrok mora biti EMS"
          : "Izaberite poduzrok prekida..."
      }
      isClearable
    />
  );
}

export default PodUzrokPrekSearchSelect;
