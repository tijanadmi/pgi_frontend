import YearSelect from "../../ui/YearSelect";
import MonthSelect from "../../ui/MonthSelect";
import TableOperations from "../../ui/TableOperations";
// import ButtonText from "../../ui/ButtonText";
import { useMoveBack } from "../../hooks/useMoveBack";

function MonthT4TableOperation() {
  const moveBack = useMoveBack();

  return (
    <>
      <TableOperations>
        <MonthSelect />
        <YearSelect></YearSelect>
        {/* <ButtonText onClick={moveBack}>&larr; Изађи</ButtonText> */}
      </TableOperations>
    </>
  );
}

export default MonthT4TableOperation;
