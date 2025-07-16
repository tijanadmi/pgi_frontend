import YearSelect from "../../ui/YearSelect";
import MonthSelect from "../../ui/MonthSelect";
import TableOperations from "../../ui/TableOperations";

function DashboardOperation() {
  return (
    <>
      <TableOperations>
        <MonthSelect />
        <YearSelect></YearSelect>
      </TableOperations>
    </>
  );
}

export default DashboardOperation;
