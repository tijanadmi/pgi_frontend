import { usePodUzrokPrek } from "./usePodUzrokPrek";
import SearchSelect from "../../ui/SearchSelect";

function PodUzrokPrekSearchSelect({ value, onChange, isDisabled, uzrokPrekId }) {
  const { isLoading, poduzrokprek } = usePodUzrokPrek(uzrokPrekId);

   if (!uzrokPrekId) {
    return (
      <SearchSelect
        options={[]}
        value=""
        onChange={() => {}}
        isDisabled
        placeholder="Прво изаберите узрок прекида"
      />
    );
  }

  if (isLoading) return <p>Учитавање...</p>;

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
          ? "Узрок мора бити ЕМС или Виша сила"
          : "Изаберите подузрок прекида..."
      }
      isClearable
    />
  );
}

export default PodUzrokPrekSearchSelect;
