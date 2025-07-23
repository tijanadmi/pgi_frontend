import DaySelect from "../../ui/DaySelect";
import MrcSelect from "../lovs/MrcSelect";
import TableOperations from "../../ui/TableOperations";

function DashboardDayOperation() {
  return (
    <>
      <TableOperations>
        <MrcSelect />
        <DaySelect />
      </TableOperations>
    </>
  );
}

export default DashboardDayOperation;
