import Filter from "../../ui/Filter";
import DaySelect from "../../ui/DaySelect";
import MrcSelect from "../../features/lovs/MrcSelect";
import TableOperations from "../../ui/TableOperations";
import ButtonText from "../../ui/ButtonText";
import { useMoveBack } from "../../hooks/useMoveBack";

function DayT3TableOperation() {
  const moveBack = useMoveBack();

  return (
    <>
      <TableOperations>
        <Filter
          filterField="funp"
          options={[
            { value: "all", label: "Сви" },
            { value: "DV", label: "ДВП/КБП" },
            { value: "TR", label: "ТРП" },
            { value: "SP", label: "СП" },
            { value: "SS", label: "СС" },
            { value: "O", label: "Остало" },
          ]}
        />
        <MrcSelect />
        <DaySelect />
        <ButtonText onClick={moveBack}>&larr; Изађи</ButtonText>
      </TableOperations>
    </>
  );
}

export default DayT3TableOperation;
