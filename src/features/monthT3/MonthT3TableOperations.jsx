import Filter from "../../ui/Filter";
import YearSelect from "../../ui/YearSelect";
import MonthSelect from "../../ui/MonthSelect";
import TableOperations from "../../ui/TableOperations";
import ButtonText from "../../ui/ButtonText";
import { useMoveBack } from "../../hooks/useMoveBack";

function MonthT3TableOperation() {
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
        <MonthSelect />
        <YearSelect></YearSelect>
        <ButtonText onClick={moveBack}>&larr; Изађи</ButtonText>
      </TableOperations>
    </>
  );
}

export default MonthT3TableOperation;
