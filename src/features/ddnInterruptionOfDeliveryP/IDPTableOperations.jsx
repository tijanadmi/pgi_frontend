import MrcSelect from "../../features/lovs/MrcSelect";
import YearSelect from "../../ui/YearSelect";
import MonthSelect from "../../ui/MonthSelect";
import TableOperations from "../../ui/TableOperations";

function IDPTableOperation() {
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

export default IDPTableOperation;
