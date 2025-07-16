import MrcSelect from "../lovs/MrcSelect";
import YearSelect from "../../ui/YearSelect";
import MonthSelect from "../../ui/MonthSelect";
import TableOperations from "../../ui/TableOperations";

function IDKTableOperation() {
  return (
    <>
      <TableOperations>
        <MrcSelect />

        <MonthSelect />
        <YearSelect></YearSelect>
      </TableOperations>
    </>
  );
}

export default IDKTableOperation;
